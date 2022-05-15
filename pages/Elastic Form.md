- # Issue
	- Setting 的 smtp form 更新時，form value 會瘋狂的變動
	  看起來是因為 formspec 的更新問題
-
- # 說明
	- Reset
	  新增了 reset props
	  
	  在一般的情況下
- # Features
	- ## 支援遞迴式的 dependOn
		- 下列範例，當 `name` 的值不是 `hello` 的時候，component `test` 跟 `test2` 都會隱藏
		  ```javascript
		  const formSpec = [
		    {
		        key: 'name',
		        type: 'text',
		        label: 'Name',
		    },
		    {
		        key: 'test',
		        type: 'text',
		        label: 'Test',
		        dependOn: { name: ['hello'] },
		    },
		    {
		        key: 'test2',
		        type: 'text',
		        label: 'Test2',
		        dependOn: { test: ['world'] },
		    }
		  ];
		  ```
- # Rules
	- formSpec 的 key 不可重複
	-
- # Data Flow
- <img src="https://mermaid.ink/img/IGdyYXBoIExSCiAgZm9ybVNwZWMtLT5pbnNpZGVGb3JtU3BlYy0tPlJlbmRlcmVkU3BlYwo" />
  collapsed:: true
  {{renderer :mermaid_kszjpzokvo}}
	- ```mermaid
	  graph LR
	    formSpec-->insideFormSpec-->RenderedSpec
	  ```
-
-
-