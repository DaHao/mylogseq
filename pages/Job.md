- # Log
	- 因為 job 沒有辦法用 `kubectl logs` 來看 log 記錄，所以要用別的方法來看。
	- $ kubectl describe jobs $JOB
	  在 job 的 Event 項目底下會有 job 開出來的 pod 名稱
	  
	  再下指令 $ kubectl logs $POD，就可以看到 job 相關的 log 了
	  
	  但如果超過 `activeDeadlineSeconds` 的時間的話，pod 也會砍掉，就沒辦法看 log 了
-