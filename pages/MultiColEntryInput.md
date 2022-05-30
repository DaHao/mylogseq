- DONE row limit
- DONE dependonac
- DONE error display
-
- {{renderer :tocgen}}
- 現在 MCEInput 支援所有 elastic form 可以用的 Input Component
- # Properties
	- ## addMoreOptions
		- 設定有關 addMore 的參數
		- **label**
		  Add More 要顯示什麼文字
		- **disabled**
		  不顯示 add More
	- ## colSpec
		- 設定 MCEInput 每一行的內容
	- ## customBtnOptions
		- 設定行尾的客製化 Button
		- **onClick**
		  點擊會觸發的 function
		- **disabled**
		  disabled === true 時，只顯示，不可點擊
	- ## enableMultiLine
		- 是否啟用多行模式，在多行模式下，colSpec 的每個 spec 都會獨立一行
	- ## enableNumbered
		- 是否在每行的開頭加上編號，從 A-Z，目前不支援超過 Z 的情況
	- ## error
		- 顯示的 error string
	- ## handleChange
		- 當 MCEInput 的格式或資料變動時，會呼叫此 function
	- ## label
		- 顯示在最上方的 MCEInput 文字
	- ## RowLimit
	  rowLimit 為一 Object，內含：
		- rowMaximum: MCE 最多接受幾筆資料，不給值的話就是沒有上限
		- rowMinimum: MCE 最少需要幾筆資料，不給值的話就是 0
	- ## Required
	  MCE 最少需要一筆 data，與 rowLimit.rowMinimum = 1 的時候作用相同
	-
- # RowCount 規則
	- 基本值是 1
	- 如果有 initData 的話，取 initData 的 length
	- 如果 initData.length 超過 rowMaximum 的話，取 rowMaximum
-