- # API Spec
	- https://gitlab.com/GeminiGitter/gemini/-/blob/GPU_MGMT/docs/api_v2_swagger.yaml
	- PaaS Job API
	  	https://hackmd.io/fq32HuuRSPaftItCmiKwLw?view#Create-a-job
	- Paas platform API
	  	https://hackmd.io/LCUPpRY3RYKhGbuqMzUZnQ?view#3-GET-apiv2platformsplatform_name
	- Paas version API
	  https://gitlab.com/geminiopencloud/engineering/infra/gemini/-/issues/860#note_662577764
-
- # 如何找到 Paas DB
	- 1. 從 backend/.env 檔找到 apigw endpoint
	- 2. 用找到的 endpoint 打 service api，並找到 goc service
	  `curl 10.113.99.1:31218/services | json_pp`
	- 3. 用 goc 打 configuration api，並找到 portal_public_ip
	  `curl https://10.15.40.11:443/api/v2/configuration/ -k -uadmin:admin | json_pp`
	- 4. 一般來說 paas 都有 phpmyadmin，所以把 `ip + /phpmyadmin` 就可以存取到 DB
	  `https://10.15.40.11/phpmyadmin`
	- 5. 追加連到 openstack 的方法：找到 optnstack ip，用 80 port 連線