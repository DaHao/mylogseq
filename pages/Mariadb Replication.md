- ```sql
  -- SQL Command
  
  -- 設定 replication 
  -- 假設現在有 2 台 k8s，k8s1 & k8s2
  -- 這個指令在 k8s2 上設定 Master host(host 會是 k8s1 的 ip/domain) 指向 k8s1 的意思會是，單向的將 k8s1 的資料倒向 k8s2
  -- 資料流會是從 Master(k8s1) > slave(k8s2)
  change master to ...
  
  -- 操作 slave
  start slave
  stop slave
  -- 刪除 relay logs
  reset slave
  
  -- 跳過 n 個 SQL 錯誤
  set global sql_slave_skip_counter = n
  -- 忽略所有錯誤，此參數無法在啟動 mysql 後修改
  SLAVE_SKIP_ERRORS = ALL
  
  -- 顯示 relay log
  show relaylog events
  -- 顯示 slave 狀態
  show slave status
  -- 顯示 master 狀態
  show master status
  -- 顯示 slave 的資訊
  show slave hosts
  
  -- 刪除 binary logs
  -- delete 前請先 flush log，並停止 replication
  reset master 
  
  -- delete all binary logs
  flush logs;
  reset master
  reset slave;
  
  -- 轉換 binlog position 為 gtid
  select BINLOG_GTID_POS("LOG_FILE", LOG_POS)
  
  -- 查看 binlog 的檔案
  -- binlog 通常在 /var/lib/mysql/binlog 這個位置
  -- 此指令需在 pod 裡面執行
  $ mysqlbinlog --start-position=243387732 mysql-binlog.000025
  ```
- # 設定 Mariadb Replication
  
  1. 按照平常的程序在 k8s1 & k8s2 開好 galera db
	- 注意 configMap.yaml 有沒有 下列參數
	  
	      ```bash
	      # gtid mode
	      ## different in every cluster
	      server_id=1
	      wsrep_gtid_mode=ON
	      wsrep_gtid_domain_id=1
	      ## different value on all nodes in a given cluster
	      ## each of these values should be different than the wsrep_gtid_domain_id value
	      gtid_domain_id=10
	      log_slave_updates=ON
	      log_bin=/var/lib/mysql/binlog/mysql-bin
	      relay_log=/var/lib/mysql/binlog/mysqld-relay-bin
	      ## binlog expired
	      expire_logs_days = 8
	      gtid_ignore_duplicates=ON
	      ```
	- 注意 pv 大小
	- 注意 nodePort 開出來的 service 只能接到 mysql-0 上
	  
	  2. 在 k8s2 上 galera 中下指令，找出 gtid 後記下來。
	  ```sql
	  MariaDB [(none)]> show master status;
	  +------------------+----------+--------------+------------------+
	  | File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
	  +------------------+----------+--------------+------------------+
	  | mysql-bin.000005 |      358 |              |                  |
	  +------------------+----------+--------------+------------------+
	  
	  MariaDB [(none)]> select binlog_gtid_pos('mysql-bin.000005', 358);
	  +------------------------------------------+
	  | binlog_gtid_pos('mysql-bin.000005', 358) |
	  +------------------------------------------+
	  | 2-2-2                                    |
	  +------------------------------------------+ 
	  ```
	  
	  3. 在 k8s2 上建立 replication user
	  
	  ```sql
	  SET @replUser = 'repl';
	  SET @replPw = 'password';
	  
	  SET @createQuery = CONCAT('CREATE USER IF NOT EXISTS "', @replUser, '"@"%" IDENTIFIED BY "',@replPw,'"');
	  PREPARE stmt FROM @createQuery; EXECUTE stmt; DEALLOCATE PREPARE stmt;
	  
	  SET @grantQuery = CONCAT('GRANT REPLICATION SLAVE ON *.* TO "',@replUser,'"@"%" ');
	  PREPARE stmt FROM @grantQuery; EXECUTE stmt; DEALLOCATE PREPARE stmt;
	  
	  flush privileges;
	  
	  -- or
	  create user if not exists 'repl'@'%' IDENTIFIED BY 'password';
	  grant replication slave on *.* to 'repl'@'%';
	  flush privileges;
	  ```
	  
	  4. 修改 replication.sql 並 cp 在 k8s1 上的 galera 執行
	  
	  ```sql
	  SET @masterHost = '10.16.30.2';
	  SET @masterPort = 30306;
	  SET @replUser = 'repl';
	  SET @replPw = 'password';
	  SET @gtidPos = '2-2-2'; -- 填入剛剛的 gtid_binlog_pos 值
	  
	  SET GLOBAL gtid_slave_pos = @gtidPos;
	  
	  SET @changeQuery = CONCAT('change master to master_host="', @masterHost, '", master_port=', @masterPort, ', master_user="', @replUser, '", master_password="', @replPw, '", master_use_gtid=slave_pos');
	  PREPARE stmt FROM @changeQuery; EXECUTE stmt; DEALLOCATE PREPARE stmt;
	  
	  START SLAVE;
	  
	  -- or
	  
	  -- 直接下命令的話，就不用再 cp replication.sql，直接 show slave status\G; 檢查狀態即可。
	  SET GLOBAL gtid_slave_pos = '2-2-2';
	  
	  change master to master_host='10.16.30.2', master_port=30306, master_user='repl', master_password='password', master_use_gtid=slave_pos;
	  
	  start slave;
	  ```
	  
	  ```bash
	  # 在 k8s1 上 cp 進 pod 
	  $ kubectl cp replication.sql mysql-0:replication.sql -napigw
	  
	  $ kubectl exec -it mysql-0 -napigw bash
	  # 執行
	  $ mysql -uroot -ppassword < replication.sql
	  
	  # check Slave_IO_Running & Slave_SQL_Running are Yes
	  mysql > show slave status \G;
	  
	  *************************** 1. row ***************************
	            Slave_IO_State: Waiting for master to send event
	               Master_Host: 10.16.30.2
	               Master_User: repl
	               Master_Port: 30306
	             Connect_Retry: 60
	           Master_Log_File: mysql-bin.000005
	       Read_Master_Log_Pos: 845
	            Relay_Log_File: mysqld-relay-bin.000002
	             Relay_Log_Pos: 1144
	     Relay_Master_Log_File: mysql-bin.000005
	          Slave_IO_Running: Yes
	         Slave_SQL_Running: Yes
	  ...
	  ```
	  
	  5. 同樣，在 k8s1 上找出 gtid
	  
	  ```sql
	  MariaDB [(none)]> show master status;
	  +------------------+----------+--------------+------------------+
	  | File             | Position | Binlog_Do_DB | Binlog_Ignore_DB |
	  +------------------+----------+--------------+------------------+
	  | mysql-bin.000004 |      452 |              |                  |
	  +------------------+----------+--------------+------------------+
	  
	  MariaDB [(none)]> select binlog_gtid_pos('mysql-bin.000004', 452);
	  +------------------------------------------+
	  | binlog_gtid_pos('mysql-bin.000004', 452) |
	  +------------------------------------------+
	  | 1-1-7196                                 |
	  +------------------------------------------+
	  ```
	  
	  6. 修改 replication.sql 並 cp 在 k8s2 上的 galera 執行
	  
	  ```sql
	  -- replication.sql
	  SET @masterHost = '10.16.30.1';
	  SET @masterPort = 30306;
	  SET @replUser = 'repl';
	  SET @replPw = 'password';
	  SET @gtidPos = '1-1-7196'; -- 填入剛剛的 gtid_binlog_pos 值
	  SET GLOBAL gtid_slave_pos = @gtidPos;
	  
	  SET @changeQuery = CONCAT('change master to master_host="', @masterHost, '", master_port=', @masterPort, ', master_user="', @replUser, '", master_password="', @replPw, '", master_use_gtid=slave_pos');
	  PREPARE stmt FROM @changeQuery; EXECUTE stmt; DEALLOCATE PREPARE stmt;
	  
	  START SLAVE;
	  
	  -- or
	  
	  -- 直接下命令的話，就不用再 cp replication.sql，直接 show slave status\G; 檢查狀態即可。
	  SET GLOBAL gtid_slave_pos = '1-1-7196';
	  
	  change master to master_host='10.16.30.1', master_port=30306, master_user='repl', master_password='password', master_use_gtid=slave_pos;
	  
	  start slave;
	  ```
	  
	  ```sql
	  # 在 k8s2 上 cp replication.sql 進 pod 
	  $ kubectl cp replication.sql mysql-0:replication.sql -napigw
	  
	  $ kubectl exec -it mysql-0 -napigw bash
	  # 執行
	  $ mysql -uroot -ppassword < replication.sql
	  
	  # check
	  mysql > show slave status \G;
	  ```
	  
	  7. check 完沒有錯誤就可以試試看 create database 之類的操作會不會同步。
- # 清除 Replication
  ```sql 
  show binary logs 
  show relaylog events;
  
  -- 注意，兩邊的 replication 都要停止
  stop slave;
  
  -- delete all binary log
  flush logs
  reset master;
  reset slave;
  ```
-
- # Reference
  官方說明文件 - [Configuring MariaDB Replication between Two MariaDB Galera Cluster](https://mariadb.com/kb/en/library/configuring-mariadb-replication-between-two-mariadb-galera-clusters/) 
  
  Master-Master Replication - [https://dotblogs.com.tw/eric_obay_talk/2018/11/05/151753](https://dotblogs.com.tw/eric_obay_talk/2018/11/05/151753)
  
  [MariaDB 的 GTID 介绍](http://mysql.taobao.org/monthly/2016/02/08/)