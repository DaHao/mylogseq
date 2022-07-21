- {{renderer :tocgen}}
- # 國網記錄
	- ## 國網 LDAP 結構
		- 國網 IService LDAP  
		  Address：140.110.8.170:389  
		  CN：cn=ai-admin,dc=iam,dc=nchc,dc=org,dc=tw  
		  PW:1qaz2wsx3edc
		- ### IAM (For Slurm)  
		  ```
		  		  # iam.nchc.org.tw
		  		  dn: dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: top
		  		  objectClass: dcObject
		  		  objectClass: organization
		  		  o: NCHC ORG.
		  		  dc: iam
		  		  
		  		  # admin, iam.nchc.org.tw
		  		  dn: cn=admin,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: simpleSecurityObject
		  		  objectClass: organizationalRole
		  		  cn: admin
		  		  description: LDAP administrator
		  		  userPassword:: e1NTSEF9ekN2ZnFMOG1MUzJwRTBSdExhYkxzM3lNTWpjMWxybjY
		  		  
		  		  # unix, iam.nchc.org.tw
		  		  dn: ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: Unix
		  		  
		  		  # ai, unix, iam.nchc.org.tw
		  		  dn: ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: AI
		  		  
		  		  # groups, ai, unix, iam.nchc.org.tw
		  		  dn: ou=groups,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: Groups
		  		  
		  		  # users, ai, unix, iam.nchc.org.tw
		  		  dn: ou=users,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: Users
		  		  
		  		  # slurm, groups, ai, unix, iam.nchc.org.tw
		  		  dn: cn=slurm,ou=groups,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  objectClass: posixGroup
		  		  objectClass: top
		  		  cn: slurm
		  		  memberUid: slurmuser
		  		  gidNumber: 202
		  		  
		  		  # zywu76074672, users ai, unix, iam.nchc.org.tw
		  		  dn: cn=zywu76074672,ou=users,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw
		  		  loginShell: /bin/bash
		  		  sn: ai
		  		  gidNumber: 16369
		  		  objectClass: person
		  		  objectClass: posixAccount
		  		  uid: zywu76074672
		  		  gecos: f0f46bf0-ce07-46d9-99df-30a56bda0c84
		  		  uidNumber: 11846
		  		  cn: zywu76074672
		  		  homeDirectory: /home/zywu76074672
		  		  userPassword: e1NTSEF9ZFZiQnNKT2VWNjh0Qk1iYjVSazQ1K1pDbFdMNDJxNYU=
		  ```
		- ### AI (For Openstack)  
		  ```
		  		  dn: cn=ai-admin,dc=ai,dc=nchc,dc=org,dc=tw
		  		  pw: password
		  		  
		  		  dn: dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: dcObject
		  		  objectClass: organization
		  		  o: ai.nchc.org.tw
		  		  dc: ai
		  		  
		  		  # roles, ai.nchc.org.tw
		  		  dn: ou=roles,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: roles
		  		  
		  		  # users, ai.nchc.org.tw
		  		  dn: ou=users,dc=ai,dc=nchc,dc=org,dc=tw
		  		  ou: users
		  		  objectClass: organizationalUnit
		  		  
		  		  # groups, ai.nchc.org.tw
		  		  dn: ou=groups,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: groups
		  		  
		  		  # people, ai.nchc.org.tw
		  		  dn: ou=people,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: top
		  		  objectClass: organizationalUnit
		  		  ou: people
		  		  
		  		  # projects, ai.nchc.org.tw
		  		  dn: ou=projects,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: organizationalUnit
		  		  ou: projects
		  		  
		  		  # test123, people, iam.nchc.org.tw
		  		  dn: cn=u9833157,ou=users,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: top
		  		  objectClass: account
		  		  objectClass: posixAccount
		  		  cn: u9833157
		  		  uid: u9833157
		  		  uidNumber: 16857
		  		  gidNumber: 168
		  		  homeDirectory: /home/u9833157
		  		  
		  		  # ladsnice3861, users, ai.nchc.org.tw
		  		  dn: cn=ladsnice3861,ou=users,dc=ai,dc=nchc,dc=org,dc=tw
		  		  objectClass: person
		  		  objectClass: posixAccount
		  		  sn: ai
		  		  uidNumber: 14026
		  		  userPassword:: MTY4M2VjaW5zZGFs
		  		  uid: ladsnice3861
		  		  loginShell: /bin/bash
		  		  gidNumber: 23314
		  		  cn: ladsnice3861
		  		  homeDirectory: /home/ladsnice3861
		  ```
	- ## 新增 ai.nchc.org.tw User  
	  ```
	  	  # userList
	  	  tommy1212 鐘聖鈞
	  	  wimoc70639 方士豪
	  	  u3687850 張偉祥
	  	  ...
	  	  
	  	  # createaiuser.sh
	  	  while IFS='' read -r line; do
	  	  arr=($line)
	  	  name=${arr[0]}
	  	  display=${arr[1]}
	  	  
	  	  PASS=$(echo ${name}|rev | openssl base64)
	  	  FILTER="cn=${name}"
	  	  
	  	  lcommand="ldapsearch -LLL -xD cn=ai-admin,dc=iam,dc=nchc,dc=org,dc=tw -wpassword -b dc=iam,dc=nchc,dc=org,dc=tw '($FILTER)' -H ldap://172.19.79.179:389 dn objectclass sn uidNumber uid loginShell gidNumber cn homeDirectory > temp.ldif"
	  	  
	  	  eval $lcommand
	  	  sed -i "/homeDirectory:/a userPassword:: ${PASS}" temp.ldif
	  	  sed -i "/homeDirectory:/a description: ${display}" temp.ldif
	  	  
	  	  cat temp.ldif >> test_aiuser.ldif
	  	  
	  	  done < "$1"
	  	  
	  	  # ----
	  	  # dn 還有做修改
	  	  $ ./createaiuser.sh userList
	  	  # 執行完後會多 temp.ldif 跟 test_aiuser.ldif
	  	  # 確認 test_aiuser.ldif 的內容正確後，就可以執行
	  	  $ ldapadd -xD cn=ai-admin,dc=ai,dc=nchc,dc=org,dc=tw -W -f test_aiuser.ldif
	  	  # 新增成功後就可以把檔案刪除
	  ```
	- ## Add User to Group at IAM LDAP
		- 因為 IService LDAP 並沒有 Slurm Group，所以同步過來的人必須要自己手動加進去 Slurm Group
		- ``` bash
		  		  #!/bin/sh
		  		  
		  		  FILE_PATH='slurm_user.ldif'
		  		  PASS=$(echo YH04Mh2XOu2SmR7lyow2jQ== | openssl enc -base64 -d -aes-256-cbc -nosalt -pass pass:mypass)
		  		  SOURCE_LDAP='ldap://140.110.8.170:389'
		  		  TARGET_LDAP='ldap://172.19.79.179:389'
		  		  
		  		  ldapsearch -LLL -xD cn=ai-admin,dc=iam,dc=nchc,dc=org,dc=tw -w $PASS -b ou=users,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw cn sn uid -H $SOURCE_LDAP > $FILE_PATH
		  		  
		  		  sed -i '1d' $FILE_PATH
		  		  sed -i -E 's/dn: .+/dn: cn=slurm,ou=groups,ou=ai,ou=unix,dc=iam,dc=nchc,dc=org,dc=tw/' $FILE_PATH
		  		  sed -i -E 's/cn: .+/changetype: modify/' $FILE_PATH
		  		  sed -i -E 's/sn: .+/add: memberUid/' $FILE_PATH
		  		  sed -i 's/uid:/memberUid:/' $FILE_PATH
		  		  
		  		  ldapmodify -c -xD cn=ai-admin,dc=iam,dc=nchc,dc=org,dc=tw -w password -f $FILE_PATH -H $TARGET_LDAP &> add_slurm_group_users.log
		  ```
	- ## 國網三期 LDAP  
	  [環境資訊](https://gitlab.com/geminiopencloud/professional-services/twcc-beta/-/wikis/Beta-%E7%92%B0%E5%A2%83/1.-VPN-%E7%9B%B8%E9%97%9C%E8%B3%87%E8%A8%8A)
		- ### Trouble Shooting
			- 廣達看起來對 ldap 是一竅不通  
			  安裝好之後還亂移位置， slapd 起不來。
			- 我先把 ldap 的目錄移回來並 `chown -R ldap:ldap openldap`
			- 先 `getent passwd` 看一下 openldap 在 centos 的帳號是什麼
			- ``` bash
			  			  [root@rms301 ~]# systemctl status slapd
			  			  ● slapd.service - OpenLDAP Server Daemon
			  			   Loaded: loaded (/usr/lib/systemd/system/slapd.service; disabled; vendor preset: disabled)
			  			   Active: failed (Result: exit-code) since 三 2020-11-11 14:02:30 CST; 9min ago
			  			     Docs: man:slapd
			  			           man:slapd-config
			  			           man:slapd-hdb
			  			           man:slapd-mdb
			  			           file:///usr/share/doc/openldap-servers/guide.html
			  			  Process: 92532 ExecStart=/usr/sbin/slapd -u ldap -h ${SLAPD_URLS} $SLAPD_OPTIONS (code=exited, status=1/FAILURE)
			  			  Process: 92516 ExecStartPre=/usr/libexec/openldap/check-config.sh (code=exited, status=0/SUCCESS)
			  			  
			  			  11月 11 14:02:30 rms301 check-config.sh[92516]: slaptest: bad configuration file!
			  			  11月 11 14:02:30 rms301 slapd[92532]: @(#) $OpenLDAP: slapd 2.4.44 (Jan 29 2019 17:42:45) $
			  			                                               mockbuild@x86-01.bsys.centos.org:/builddir/build/BUILD/openldap-2.4.44/openldap-2.4.44/servers/slapd
			  			  11月 11 14:02:30 rms301 slapd[92532]: olcDbDirectory: value #0: invalid path: No such file or directory
			  			  11月 11 14:02:30 rms301 slapd[92532]: config error processing olcDatabase={2}hdb,cn=config: olcDbDirectory: value #0: invalid path: No such file or directory
			  			  11月 11 14:02:30 rms301 slapd[92532]: slapd stopped.
			  			  11月 11 14:02:30 rms301 slapd[92532]: connections_destroy: nothing to destroy.
			  			  11月 11 14:02:30 rms301 systemd[1]: slapd.service: control process exited, code=exited status=1
			  			  11月 11 14:02:30 rms301 systemd[1]: Failed to start OpenLDAP Server Daemon.
			  			  11月 11 14:02:30 rms301 systemd[1]: Unit slapd.service entered failed state.
			  			  11月 11 14:02:30 rms301 systemd[1]: slapd.service failed.
			  ```
			- 我直接把 olcDatabase={2}hdb.ldif 移除之後成功拉起 slapd
			- 拉起來之後發現沒辦法拿到 cn=config 的密碼
			- [在 CentOS 上安裝 LDAP Server 2.4](https://bojack.pixnet.net/blog/post/32056233)  
			  看這一篇來安裝
			- cp /usr/share/openldap-servers/slapd.conf.obsolete /etc/openldap/slapd.conf
			- 不過這一段有問題，openldap-servers 裡面沒有 slapd.conf，只有 slapd.ldif  
			  試過之後發現 slapd.ldif 沒辦法用 `slaptest -f /etc/openldap/slapd.conf -F /etc/openldap/slapd.d` 來重建 slapd.d
			- 直接的解法  
			  ```
			  			  slapadd -n 0 -F /etc/openldap/slapd.d -l slapd.ldif
			  ```
			- 檔案就會 config 進 slapd.d 了，然後記得要改變擁有者 `chown -R ldap:ldap slapd.d`，重開 slapd service `systemctl restart slapd`
			- replication.ldif  
			  https://gitlab.com/geminiopencloud/engineering/gateway/api_gateway/-/tree/develop/deployment/ldap_template/k8s-template
			- ### Password 不會從國網同步回來
				- 這個是因為同步的 type=refreshAndPersist 設定錯誤