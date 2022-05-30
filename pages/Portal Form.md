- {{renderer :tocgen}}
- Elastic form 接受特定格式的 Spec 來渲染出 Form 表單，Spec 的格式以下說明
  title:: Portal Form
- # Properties
	- ## CancelOption
	  設定 取消按鈕 的樣式
		- **disabled**
		  disabled === true 時，該按鈕可見，但不可點按
		- **label**
		  在 取消按鈕 上顯示的文字
	- ## DisableIgnore
	  這個 property 設定為 true 的話，最後輸出的 formData 仍然會包含 ignore 的 component 資料
	  主要是設計給 stepForm 做使用，舉例來說：
	  
	  Create Job 的 commandType 設定為 ignore，可是在 Next 之後的 elasticForm 仍然會需要這個值
	  所以需要 `disableIngore` 來輸出 ignore 的資料
	- ## Reset
	  新增了 reset props
	    
	  在一般的情況下 elastic form 會自己掌握 reset form 的時機
	  但在少數的情況，開發者必須自行控制 form reset 的時機
	    
	  當 reset === true 時，表示 form 會在 formSpec 改變時重新 render
	  當 reset === false 時，表示 form 不會在 formSepc 改變時重新 render，直到 reset === true
	- ## lang
	  Elastic form 會使用 useContext 來取得 lang 的值
	  
	  但是 lang 是在 登入之後才會放進 Context 中，因此在登入之前是取不到 lang Object 的  
	  所以 elastic form 提供替代的 props 
	  
	  當 Context 取不到值時，Elastic Form 會使用此 props 來取代原本的 lang
- # Issue
	- DONE Setting 的 smtp form 更新時，form value 會瘋狂的變動
	  看起來是因為 formspec 的更新問題
	  
	  加入了 reset flag 來指定重新 reset 的時機，有解決這個問題
	  但老實說怎麼解決的不太清楚，目前只是推測延後了時機，以致於不會讓 state 互相衝突
	- TODO pipeline / template 的 volume mount format 沒有改
	  好像是我的問題，format 的格式是正確的
	- TODO pipeline / template 的 stage job 編輯跟 duplicate 都是空白
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
- 之所以要轉化成 insideFormSpec 的原因在於，我不希望每一次 reducer dispatch 的時候，reducer 都必須要跑一次迴圈來找出 target spec 在哪裡
- 拿 spec key 當 key 的話，可以很輕易的快速找出我要的 target spec
-
- # Input Component
	- ## List
		- [[MultiColEntryInput]]
	- ## Common Properties
	  此處列出所有的 Input Component 都可以用的 property
		- ### AutoValue
		  當滿足 autoValue 的條件之後，此 component 會將特定的 value 填入指定的欄位
		  **Format**
		  ```javascript
		  // 當 <component key> 的 value 符合 data 中的 <other component value> 值時  
		  // 被設定 autoValue 的 componet 的 <specific field> 欄位的值將會被替換成 <value as string, object, array>
		  autoValue: {
		    <component key>: {
		    	field: <specific field>,
		      data: {
		      	<other component value>: <value as string, object, array>,
		          // key pair as first one
		      }
		    }
		  }
		  ```
		  ```json
		  // 範例 1
		  {
		    key: 'secret',
		    label: 'variable',
		    type: 'select',
		    options: [
		      { label: 'testSecret1', value: 'testSecret1' },
		      { label: 'testSecret2', value: 'testSecret2' },
		    ],
		  },
		  {
		    key: 'value',
		    label: 'variable',
		    type: 'select',
		    autoValue: {
		      secret: {
		        field: 'options',
		        data: {
		          testSecret1: [
		            { label: 'test1', value: 'value1' },
		            { label: 'test2', value: 'value2' },
		          ],
		          testSecret2: [
		            { label: 'test3', value: 'value3' },
		            { label: 'test4', value: 'value4' },
		          ],
		        },
		      },
		    },
		  }
		  
		  // 範例 2
		  {
		    // ...
		    autoValue: {
		      secret: {
		        field: 'value',
		        data: {
		          testSecret1: 'autoValue1',
		          testSecret2: 'autoValue2'
		        },
		      },
		    }
		  }
		  ```
- #gemini