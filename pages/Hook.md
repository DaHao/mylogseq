- {{renderer :tocgen}}
-
- # useState vs. useReducer
	- [什麼時候該用 useState？什麼時候該用 useReducer？](https://kentcdodds.com/blog/should-i-usestate-or-usereducer)
	- **重點摘錄**
		- 當 state 是獨立元素的時候使用 useState
		- 當state 中某個元素依賴於另一個元素時，使用 useReducer
-
- # useEffect
	- [useEffect 完整指南](https://overreacted.io/zh-hant/a-complete-guide-to-useeffect/#tldr)
	  目前看到寫最好的 useEffect 的文章，不過還是常常忘記裡面的東西，應該需要再多讀幾遍
	-
	- ## 使用函式注意事項
	- 1. [函式依賴於 state or props](https://pjchender.dev/react/react-doc-use-effect-hooks#%E5%87%BD%E5%BC%8F%E7%9B%B8%E4%BE%9D%E6%96%BC-state-%E6%88%96-prop)
		- 若函式不需要重複使用：直接放進 useEffect 裡
		  		```javascript
		  // 👍 正確寫法：把有相依到的 states 或 props 的函式一併放到 useEffect 內
		  function ProductPage({ productId }) {
		  	const [product, setProduct] = useState(null);
		  	useEffect(() => {
		  		// 將 function 搬到 effect 內，可以清楚定義這個函式內用到了哪些 state 或 prop
		  		async function fetchProduct() {
		  			const response = await fetch('http://myapi/product' + productId);
		   			const json = await response.json();
		   			setProduct(json);
		  		}
		  		fetchProduct();
		  	}, [productId]); 
		      // ✅ 這是有效的，因為在這個 effect 中我們只有相依用到 productId 這個 prop
		  }
		  ```
		- 若函式會重複使用： 使用 useCallback
		  		```javascript
		  import React, { useState, useEffect, useCallback } from 'react';
		  
		  const FetchData = () => {
		  	const [query, setQuery] = useState('');
		  
		  	// 需要把 query state 放進 useCallback 的相依陣列
		  	const getFetchUrl = useCallback(() => {
		  		return 'https://hn.algolia.com/api/v1/search?query=' + query;
		  	}, [query]);
		  
		  	useEffect(() => {
		  		const url = getFetchUrl();
		  		// 對 url 做某些事...
		  	}, [getFetchUrl]);
		  
		  	return (
		  		<div>
		   			<h1>Fetch Data</h1>
		   			<input type="text" onChange={(e) => setQuery(e.target.value)} />
		  		</div>
		  	);
		  };
		  
		  export default FetchData;
		  ```
		- useCallback 回傳的函式一樣可以當成 props 傳給子元件，但有一點很麻煩的是，你不知道傳進來的 props function 有沒有被 useCallback 包起來……
		  ```javascript
		  // https://overreacted.io/a-complete-guide-to-useeffect/#but-i-cant-put-this-function-inside-an-effect
		  function Parent() {
		  	const [query, setQuery] = useState('react');
		  	// ✅ Preserves identity until query changes
		  	const fetchData = useCallback(() => {
		  		const url = 'https://hn.algolia.com/api/v1/search?query=' + query;
		  		// ... Fetch data and return it ...
		  	}, [query]); // ✅ Callback deps are OK
		  	
		    	return <Child fetchData={fetchData} />;
		  }
		  
		  function Child({ fetchData }) {
		  	let [data, setData] = useState(null);
		  	useEffect(() => {
		  		fetchData().then(setData);
		  	}, [fetchData]); // ✅ Effect deps are OK
		    	// ...
		  }
		  ```
	- 2. [函式不依賴 state or props](https://pjchender.dev/react/react-doc-use-effect-hooks#%E5%87%BD%E5%BC%8F%E4%B8%8D%E4%BE%9D%E8%B3%B4-state-%E6%88%96-prop)
		- 將函式拉到 function component 外
		  		```javascript
		  function getFetchUrl(query) {
		  	return 'https://hn.algolia.com/api/v1/search?query=' + query;
		  }
		  
		  function SearchResults() {
		  	useEffect(() => {
		  		const url = getFetchUrl('react');
		  		// ... Fetch data and do something ...
		  	}, []); // ✅ Deps are OK
		  
		  	useEffect(() => {
		  		const url = getFetchUrl('redux');
		  		// ... Fetch data and do something ...
		  	}, []); // ✅ Deps are OK
		  
		  	// ...
		  }
		  ```
		- 使用 useCallback
		  		```javascript
		  import React, { useEffect, useCallback } from 'react';
		  
		  const FetchData = () => {
		  	console.log('invoke function component');
		    
		  	const getFetchUrl = useCallback((query) => {
		  		return 'https://hn.algolia.com/api/v1/search?query=' + query;
		  	}, []);
		  
		  	useEffect(() => {
		  		const url = getFetchUrl('react');
		  		// 對 url 做某些事...
		  	}, [getFetchUrl]);
		  
		  	useEffect(() => {
		  		const url = getFetchUrl('redux');
		  		// 對 url 做某些事...
		  	}, [getFetchUrl]);
		  
		      return (
		          <div>
		              {console.log('render')}
		              <h1>Fetch Data</h1>
		          </div>
		      );
		  };
		  
		  export default FetchData;
		  ```
		- **補充**
		  若是要在 useEffect 呼叫 props 的函式，最好是在 parent componet 把被呼叫的函式用 useCallback 包起來，再傳給 child component
		- 參考：[useEffect call function in throw props](https://stackoverflow.com/questions/58747424/useeffect-show-a-warning-if-i-call-a-function-in-throw-props)
		  	```javascript
		  const { useState, useCallback } = React;
		  
		  function App() {
		  	const [count, setCount] = useState(1);
		  	const add = () => setCount(count => count + 1);
		  	const aCallback = useCallback(() => count, [count]);
		  	
		    	return (
		  		<div>
		  			{count}
		  			<button onClick={add}>+</button>
		  			<Child aCallback={aCallback} />
		  		</div>
		   	);
		  }
		  
		  function Child({ aCallback }) {
		  	return <div>{aCallback()}</div>;
		  }
		  
		  ReactDOM.render(<App />, document.getElementById('root'));
		  ```
	- ## useEffect 的 return 
	  參考：[深度梳理 React Hook 对副作用操作的处理（二）](https://www.jianshu.com/p/fdab5a6fa1aa)
	  **重點摘錄**
	- 什麼是副作用
	  	Function 做了與回傳運算值無關的事情，這些事情就是副作用
	  	比方說 console.log、修改傳入的參數 …等
	- axios 的範例
	  	```js
	  	// aaxios CancelToken API
	  	useEffect(() => {
	   const source = axios.CancelToken.source();
	   const fetchData = async () => {
	  try {
	    const response = await Axios.get("/companies", {
	  	cancelToken: source.token
	    });
	    // ...
	  } catch (error) {
	    if (Axios.isCancel(error)) {
	  	//cancelled
	    } else {
	  	throw error;
	    }
	  }
	   };
	   fetchData()
	   return () => {
	  source.cancel();
	   };
	  	}, [companies]);
	  	```