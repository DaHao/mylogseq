- {{renderer :tocgen}}
-
- Asyncjs 是一個 javascript 的 package，適用於 web & nodejs
-
- # Common
	- ## error handling
		- async 的 map, each 之類的函式，一遇到錯誤就會停止執行
		  ```js
		  var async = require("async");
		  
		  async.map(
		    [1, 2, 3],
		    (i, cb) => {
		      if (i === 2) { cb(i); }
		      else cb(null, i);
		    },
		    (error, result) => {
		      if(error) {
		        console.log(`callback error: ${error}`);
		        console.log(result);
		      }
		      else console.log(result);
		    }
		  )
		  
		  // callback error: 2
		  // [ 1, undefined ]
		  ```
	- ## [callback 為什麼是 undefined](https://github.com/caolan/async/issues/1407#issuecomment-294913854)
		- 如果你的 iteator 是 async 如下的話，它不會再傳 callback 進去，而是改以 return value 為結果
		  map、each 都一樣，連 waterfall 也是
		  ```js
		  Async.each(somArray,
		    async (item) => {
		      dosomething();
		      return result;
		    },
		    (error) => {
		      console.log(err);
		    }
		  );
		  ```
- # Map
	- map 系列的函式基本上的形式都是 `map(coll, iteratee, callback)`，第三個參數 callback 不加的話，回傳值會是一個 promise
	- 下列程式碼示範 map 系列函式，如果中間的 iteratee 要用 async 函式的寫法
	  ```javascript
	  async function test() {
	  const codeList = [ { statusCode: 200 }, { statusCode: 201 }, { statusCode: 202 } ];
	  return await async.mapSeries(codeList,
	    async (code) => {
	      const res = await axios({
	        url: `http://localhost:30001/status/${code.statusCode}`,
	        method: 'GET',
	      }).catch(error => { throw error; });
	      console.log(`In test function: ${res.statusText}`);
	      return res.statusText;
	    })
	    .then(res => res)
	    .catch(error => { throw error; });
	  }
	  
	  async function main() {
	  	const result = await test().catch(error => { throw error; });
	  	console.log(`Print result: ${result}`);
	  }
	  main();
	  
	  // In test function: OK
	  // In test function: CREATED
	  // In test function: ACCEPTED
	  // Print result: OK,CREATED,ACCEPTED
	  
	  ```
# Waterfall
waterfall 很妙的是，如果是 async function 跟 non-async function 混雜的時候，是各做各的
async 函式 return 的時候，不需要 await 再 return 
```
async function func1() {
return axios({
  url: 'http://localhost:30001/status/200',
  method: 'GET',
})
  .then(res => {
 console.log(res.status, res.statusText);
 return res.status;
	})
  .catch(error => {
    console.log('阿伯～出事了！阿伯！');
    console.log(error);
  });
}

function func2(status, callback) {
console.log(`function 2: ${status}`);
callback(null, status);
}

async.waterfall([
func1,
func2,
], (err, result) => {
console.log('done');
console.log(result);
});
// 200 OK
// function 2: 200
// done
// 201
```
# forEach
forEach 是典型的射後不理
執行完就沒事，不會回傳值，但是發生錯誤的時候有幾個地方應該注意

首先，在 iteatee 裡面的 async function 需要 await，不然發生錯誤的時候會回傳 `UnhandledPromiseRejectionWarning`，就算你有用 catch 接住也一樣

(用 catch 接好接滿，一樣出錯)
```js
const result = await Async.forEach(urlList, async url => {
  if (url.includes('https')) {
    axios({ url, method: 'GET' })
      .then(res => {
        if (url.includes('yahoo')) {
          throw 'bad request';
        }
        console.log(url, res.status);
        return `${url}: ${res.status}`;
      }).catch(error => { throw error; });
  } else { console.log('------ non https'); }
}).catch(error => { throw error; });
```

加上 await 的話，你的 iteatee 可以不用加上 catch ，最外面的地方一樣可以接到 error
不過要注意，就算 throw error，其它的函式還是會繼續執行  
```js
const result = await Async.forEach(urlList, async url => {
  if (url.includes('https')) {
    await axios({ url, method: 'GET' })
      .then(res => {
        if (url.includes('yahoo')) {
          throw 'bad request';
        }
        console.log(url, res.status);
        return `${url}: ${res.status}`;
      });
  } else { console.log('------ non https'); }
});
// ---
test().catch(error => { console.log('outside error', error); });
// pirnt "outside catch Error: bad request"
```

完整範例
```
async function test() {
const urlList = [
  "https://www.google.com",
  "http://www.google.com",
  "https://tw.yahoo.com/",
  "https://www.facebook.com/",
];

const result = await Async.forEach(urlList, async url => {
  if (url.includes('https')) {
    await axios({ url, method: 'GET' })
      .then(res => {
        if (url.includes('yahoo')) {
          throw 'bad request';
        }
        console.log(url, res.status);
        return `${url}: ${res.status}`;
      });
  } else { console.log('------ non https'); }
});

console.log('done');
console.log(result);
}
test().catch(error => { console.log('outside catch', error); });

```
# Error
感覺像被 javascript 給陰到了一樣

waterfall 的程式碼，你如果在程式中出錯，並且在 callback 中嚐試印出來的話

```js
async function func1() {
return axios({
  url: 'http://localhost:30001/status/200',
  method: 'GET',
})
  .then(res => {
    console.log(res.status, res.statusText);
 throw error;
    return res.status;
  })
  .catch(error => {
    console.log('阿伯～出事了！阿伯！');
    console.log(error);
  });
}

function func2(status, callback) {
console.log(`function 2: ${status}`);
callback(null, status);
}

async.waterfall([
func1,
func2,
], (err, result) => {
	if (err) console.log(JSON.stringify(err));
	else {
    console.log('done');
    console.log(result);
	}
});
```
你會發現你印出一個空物件 `{}`
一開始我以為不能這樣寫，試了很久，最後才發現

** 你沒辦法用 JSON.stringify() 去顯示 Javascript 的 Error 型態 **

https://stackoverflow.com/questions/18391212/is-it-not-possible-to-stringify-an-error-using-json-stringify

https://stackoverflow.com/questions/38513493/why-are-my-js-promise-catch-error-objects-empty

幹，林北花了一個下午在查這個問題，有夠智障