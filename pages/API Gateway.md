- {{renderer :tocgen}}
- Gemini 的 Api gateway 記錄
- # API
	- ```bash
	  # ADMIN_KEY
	  curl -X GET 10.111.20.10:31218/consumers/admin/api_key | jq '.data[0].key' | sed -e 's/^"//' -e 's/"$//'
	  
	  # PROJECT_ID
	  curl -u admin: -X GET -k http://10.111.20.10:31215/api/v2/default_k8s/projects/ -H 'x-api-host:goc' -H "x-api-key:$ADMIN_KEY" | jq '.[0].id'
	  ```
- # API Key
	- **找 consumer 的 api key**
	  ```bash
	  curl -XGET http://[k8s ip]:31218/consumers/[consumer id]/api_key
	  ```
	- **延長 api key expired time**
	  ```bash
	  curl -XPATCH http://[k8s ip]:31218/api_key/[key id]
	   -H 'Content-type:application/json'
	   -d '{ "reset_expired_days": 180 }'
	  ```
- # ACL
  有關 acl 的相關操作
	- ## 列出 apikey 的 acl
		- ```bash
		  curl http://10.112.1.3:31218/api_key/e2e2bb09-ed09-4d7c-97c0-8a769bfd6786/acls
		  ```
	-
	- ## 將 service 加入到 apikey 的 acl
		- ```bash
		  curl -XPOST http://10.112.1.3:31218/api_key/e2e2bb09-ed09-4d7c-97c0-8a769bfd6786/acls -d 'group=goc'
		  ```
- # IAM
  每當 paas 開發 api 的時候，gw 需要給 api 權限才能透過 gw 存取
  每次都要請 gw 開通，記錄開通的步驟
	- ## 記錄 iam 的 excel
		- https://docs.google.com/spreadsheets/d/1gZ4Z7HNyqAa2K5EPh3GmHK9oxaWplL4VQINWTmrgaZw/edit#gid=0
	- ## 列出 iam actions
	  ```
	  curl 10.233.45.66:8001/iam/resources/iam/actions | json_pp
	  ```
	- ## 加 API 進 iam actions
		- post 的時候 `+` 前面好像要加上 `%` 
		  比方說 `/api/v3/.%+/secrets/`，加進去 api 後會是 `api/v3/.+/secrets/`
		- ```
		  curl -X POST 10.233.45.66:8001/iam/resources/iam/actions -d 'path=/api/v3/.%+/secrets/' -d 'name=ListSecrets' -d 'method=GET'
		  ```
		- Create 完後會有 action id，可以打 API 來看
		- ```
		  curl 10.233.45.66:8001/iam/actions/ae5986d4-ee0a-44d2-9e39-5fe966792ad9 | json_pp
		  ```
	- ## 列出 iam 的 policy
		- ```
		  curl 10.233.45.66:8001/iam/policys | json_pp
		  ```
	- ## 加入 iam Policy
		- action 確認後就可以加入 policy
		  ```
		  curl -X PATCH 10.233.45.66:8001/iam/policys/b71a3c16-562e-413d-bc9b-da3e160accc2     -d 'acls[]=iam::ListSolutions'     -d 'acls[]=iam::ListSuperProjects'     -d 'acls[]=iam::ListProjects'     -d 'acls[]=iam::GetProjectQuota'     -d 'acls[]=iam::GetUserQuota'     -d 'acls[]=iam::ListSites'     -d 'acls[]=iam::CreateSites'     -d 'acls[]=iam::DeleteSites'     -d 'acls[]=iam::UpdateSites'     -d 'acls[]=iam::UpdateSitesDetail'     -d 'acls[]=iam::ListJobs'     -d 'acls[]=iam::CreateJobs'     -d 'acls[]=iam::DeleteJobs'     -d 'acls[]=iam::ListLicense'     -d 'acls[]=iam::UpdateLicense'     -d 'acls[]=iam::ListPlatforms'     -d 'acls[]=iam::ListHosts'     -d 'acls[]=iam::ListFlavors'     -d 'acls[]=iam::CreateFlavors'     -d 'acls[]=iam::DeleteFlavors'     -d 'acls[]=iam::UpdateFlavors'     -d 'acls[]=iam::ListUsers'     -d 'acls[]=iam::CreateUsers'     -d 'acls[]=iam::DeleteUsers'     -d 'acls[]=iam::UpdateUsers'     -d 'acls[]=iam::ListPods'     -d 'acls[]=iam::GetPaaSVersion'     -d 'acls[]=iam::ListAZs'     -d 'acls[]=iam::ListDockerImage'     -d 'acls[]=iam::UploadDockerImage'     -d 'acls[]=iam::DeleteDockerImage'     -d 'acls[]=iam::ListAPIKeys'     -d 'acls[]=iam::UpdateSolutions'     -d 'acls[]=iam::CreateSolutions'     -d 'acls[]=iam::DeleteSolutions'     -d 'acls[]=iam::UploadSolutions'     -d 'acls[]=iam::CreateProjects'     -d 'acls[]=iam::DeleteProjects'     -d 'acls[]=iam::AssociateUserToProject'     -d 'acls[]=iam::UpdateUserInProject'     -d 'acls[]=iam::DisassociateUserToProject'     -d 'acls[]=iam::UpdateProjects'     -d 'acls[]=iam::UpdateProjectQuota'     -d 'acls[]=iam::UpdateUserQuota'     -d 'acls[]=iam::CreatePlatforms'     -d 'acls[]=iam::UpdatePlatforms'     -d 'acls[]=iam::DeletePlatforms'     -d 'acls[]=iam::UpdateHosts'     -d 'acls[]=iam::UpdateHostsAction'     -d 'acls[]=iam::ListPipelines'     -d 'acls[]=iam::CreatePipelines'     -d 'acls[]=iam::DeletePipelines'     -d 'acls[]=iam::ListTemplates'     -d 'acls[]=iam::CreateTemplates'     -d 'acls[]=iam::UpdateTemplates'     -d 'acls[]=iam::DeleteTemplates'     -d 'acls[]=iam::ListSchedulers'     -d 'acls[]=iam::CreateSchedulers'     -d 'acls[]=iam::UpdateSchedulers'     -d 'acls[]=iam::DeleteSchedulers'     -d 'acls[]=iam::UpdateAZs'     -d 'acls[]=iam::CreateAZs'     -d 'acls[]=iam::DeleteAZs'     -d 'acls[]=iam::ListQueues'     -d 'acls[]=iam::CreateQueues'     -d 'acls[]=iam::ListOperationHistory'     -d 'acls[]=iam::ListEventHistory'     -d 'acls[]=iam::CreateAPIKeys'     -d 'acls[]=iam::UpdateAPIKeys'     -d 'acls[]=iam::DeleteAPIKeys'     -d 'acls[]=iam::ListSecrets'     -d 'acls[]=iam::CreateSecrets'     -d 'acls[]=iam::ListSecretsDetail'     -d 'acls[]=iam::UpdateSecrets'     -d 'acls[]=iam::DeleteSecrets'
		  ```