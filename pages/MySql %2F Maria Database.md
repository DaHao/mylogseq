- # Docker Install
  ```
  docker run -d --name mariadb -p 3306:3306 -e "MYSQL_USER=kong" -e "MYSQL_PASSWORD=kong" -e "MYSQL_ROOT_PASSWORD=123123" -e "MYSQL_DATABASE=kong" mariadb:10.3.7
  ```
- # K8S Image Source
  Portal 的 mariadb 是根據這份 k8s image 改的
  https://github.com/ausov/k8s-mariadb-cluster
- # Backup & Restore
  ```bash
  # 備份單一資料庫
  $ mysqldump -h hostname -u root -p database_name > backup.sql;
  # 備份資料庫中單一資料表
  $ mysqldump -u root -p database_name table_name > backup.sql;
  # 備份資料庫中多張資料表
  $ mysqldump -u root -p database_name table1 table2 > backup.sql;
  # 備份多個資料庫
  $ mysqldump -u root -p --databases db1 db2 > backup.sql;
  # 備份所有資料庫
  $ mysqldump -u root -p --all-databases > backup.sql;
  ```
  ```bash
  # 復原單一資料庫
  $ mysql -u root -p database_name < backup.sql
  # 復原多個資料庫
  $ mysql -u root -p < backup.sql
  ```
- # Backup K8S DB to local SOP
  ```shell
  # Inside mariadb pod
  $ mysqldump -uroot -p xportal > 10.15.1.10backup.sql
  # In k8s
  $ kubectl cp mariadb-0:10.15.1.10backup.sql ./10.15.1.10backup.sql -ngemini
  # In local
  $ rsync -avzh gemini@10.15.1.10:~/10.15.1.10backup.sql 10.15.1.10backup.sql
  $ docker cp 10.15.1.10backup.sql mariadb:/10_15_1_10_backup.sql
  # In docker
  mysql > drop database xportal_10_15_1_10;
  mysql > create database xportal_10_15_1_10;
  $ mysql -uroot -p xportal_10_15_1_10 < 10_15_1_10_backup.sql
  ```