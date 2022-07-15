- {{renderer :tocgen}}
-
- # Context
  collapsed:: true
	- ## 如何使用 Context
		- 參考： [Using Context API in React (Hooks and Classes)](https://www.taniarascia.com/using-context-api-in-react/)
		-
		- 1. 建立 Context
		  ```js
		  //UserContext.js
		  import React from 'react'
		  
		  const UserContext = React.createContext()
		  
		  export default UserContext
		  ```
		- 2. Provider Context
		  在外層包裹 Provider
		  ```js
		  import React from 'react'
		  import HomePage from './HomePage'
		  import UserContext from './UserContext'
		  function App() {
		  	const user = { name: 'Tania', loggedIn: true }
		  	return (
		  		<UserContext.Provider value={user}>
		    			<HomePage />
		  		</UserContext.Provider>
		  	);
		  }
		  ```
		- 3. Consuming Context
		  這裡分成兩種 Class component 跟 Function component
			- Class component
			  	```javascript
			  import React, { Component } from 'react'
			  import UserContext from './UserContext'
			  
			  class HomePage extends Component {
			  	static contextType = UserContext
			  
			  	componentDidMount() {
			  		const user = this.context
			  		console.log(user) // { name: 'Tania', loggedIn: true }
			  	}
			  
			  	render() {
			  		return <div>{user.name}</div>
			  	}
			  }
			  
			  /*******another way*********/
			  
			  import React, { Component } from 'react'
			  import { UserConsumer } from './UserContext'
			  
			  class HomePage extends Component {
			  	render() {
			  		return (
			   			<UserConsumer>
			  			{(props) => {
			  				return <div>{props.name}</div>
			  			}}
			   			</UserConsumer>
			  		);
			  	}
			  }
			  ```
			- Function component
			  	```javascript
			  import React, { useContext } from 'react'
			  import UserContext from './UserContext'
			  
			  export const HomePage = () => {
			  	const user = useContext(UserContext)
			  
			  	return <div>{user.name}</div>
			  }
			  ```
- # [[Hook]]
- # [[CSS]]
- # [[自動化測試]]