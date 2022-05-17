- portal 的 backend log，好像有 api key - -
-
- # Rule
	- workerspace 綁定 project
		- 問題是綁定的是 portal project 還是 paas project
			- 我目前覺得應該是綁定 portal project
			  
			  如果有需要的話 paas project 以子錢包呈現
			  但這樣又牽扯到，那預設要給 paas 子錢包多少 quota ？
-
- # Entity
	- delete 是 soft delete ？不然怎麼會有 deleted_at 的時間
	- schema 有沒有 spec
-
- # Price
	- DONE 如果 price 是跟著 entity 走的話，好像不需要 workspace id ？
		- 有可能 entity 是一個 ws id，price 又是另外一個 ws id 嗎？
		  => 有可能
		- 錢包才一定需要 workspace，如果是 entity & price 的話就是可選的選項
	-
- # Overview page
	- 需顯示 錢包 資訊
-
- # Log
	- 扣款記錄
- #gemini