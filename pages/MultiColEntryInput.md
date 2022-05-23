- # Properties
	- ## RowLimit
	  rowLimit 為一 Object，內含：
		- rowMaximum: MCE 最多接受幾筆資料，不給值的話就是沒有上限
		- rowMinimum: MCE 最少需要幾筆資料，不給值的話就是 0
	- ## Required
	  MCE 最少需要一筆 data，與 rowLimit.rowMinimum = 1 的時候作用相同
- # RowCount 規則
	- 基本值是 1
	- 如果有 initData 的話，取 initData 的 length
	- 如果 initData.length 超過 rowMaximum 的話，取 rowMaximum
-