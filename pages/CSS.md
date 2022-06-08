- {{renderer :tocgen}}
- # Normal
	- ## 省略文字 (Truncate text)
	- 寫法
	  ```html
	  <div class="wrapper">
	    <div class="overflow-ellipsis">
	      This text is truncated, because there is not enough space to display it completely.
	    </div>
	  </div>
	  ```
	  ```css
	  .wrapper {
	    display: flex;
	    height: 100vh;
	    align-items: center;
	    justify-content: center;
	    background: #4776e6;
	    background: -webkit-linear-gradient(to right, #4776e6, #8e54e9);
	    background: linear-gradient(to right, #4776e6, #8e54e9);
	  }
	  .overflow-ellipsis {
	    width: 200px;
	    background-color: #fff;
	    padding: 15px;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	  }
	  ```
	- ## 在特定行數省略文字
	- 寫法
	- ```html
	  This text is trimmed to 3 lines
	  <div class="tile">
	  <p class="line-clamp">
	    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
	    An ellipsis will be shown at the point where the text is clamped.
	  </p>
	  </div>
	- This text is trimmed to 4 lines
	  <div class="tile">
	  <p class="line-clamp line-clamp--four">
	    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
	    An ellipsis will be shown at the point where the text is clamped.
	  </p>
	  </div>
	- This text is not trimmed
	  <div class="tile">
	  <p>
	    You can use <code>-webkit-line-clamp</code> property to truncate the text to the specific number of lines.
	    An ellipsis will be shown at the point where the text is clamped.
	  </p>
	  </div>
	  ```
	  ```css
	  body {
	  padding: 20px;
	  font-family: 'Open Sans', sans-serif;
	  }
	- .tile {
	  background: linear-gradient(to right, #2B32B2, #1488CC);
	  padding: 15px;
	  margin-bottom: 15px;
	  padding: 15px;
	  width: 300px;
	  color: #fff;
	  }
	  .line-clamp {
	  display: -webkit-box;
	  -webkit-box-orient: vertical;
	  -webkit-line-clamp: 3; /* Change this line if you want. In this case it trimmed the text to 3 lines. */
	  overflow: hidden;
	  }
	  .line-clamp--four {
	  -webkit-line-clamp: 4; /* Trimmed the second tile to four lines. */
	  }
	  ```
- # React
	- ## 套用屬性
	  ```js
	  const styles = theme => ({
	  ...
	  tr: {
	    background: "#f1f1f1",
	    '&:hover': {
	       background: "#f00",
	    },
	  },
	  ...
	  });
	  
	  return <TableRow className={props.classes.tr} ...>
	  ```
	- ## [Material-ui/Styles](https://material-ui.com/styles/basics/)
	- ## withStyles
	  withStyles 看起來是 material-ui package 所提供的功能
	  ```js 
	  const styles = {
	  tr: {
	    background: "#f1f1f1",
	    '&:hover': {
	      background: "#f00",
	    }
	  }
	  };
	  
	  function Table(props) {
	  return (
	    <Table>
	      <TableRow className={props.classes.tr}>
	        {"table row"}
	      </TableRow>
	    </Table>
	  );
	  }
	  
	  export default withStyles(styles)(Table);
	  ```
	- ## makeStyles
	  只應用在單個 Component
	  ```js
	  import React from 'react';
	  import { makeStyles } from '@material-ui/core/styles';
	  import Button from '@material-ui/core/Button';
	  
	  const useStyles = makeStyles({
	  root: {
	    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	    border: 0,
	    borderRadius: 3,
	    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
	    color: 'white',
	    height: 48,
	    padding: '0 30px',
	  },
	  });
	  
	  export default function Hook() {
	  const classes = useStyles();
	  return <Button className={classes.root}>Hook</Button>;
	  }
	  ```
	- ## Override child component classes
	  當使用別人寫好的 component 的時候，有時候會想要改變 css，可是又無法進去改程式碼的時候可以使用這個技巧。
	  
	  **child component**
	  ```js
	  import { makeStyles } from '@material-ui/core/styles';
	  import InputBase from '@material-ui/core/InputBase';
	  
	  const useStyles = makeStyles(theme => ({
	  	input: {
	  color: red,
	  	}
	  }));
	  function EditableLabel(props) {
	  	// useStyles 的時候，要吃 parent 傳下來的 classes
	  	const classes = useStyles(props);
	  	return (
	  <InputBase
	    className={classes.input}
	        />
	    );	
	  }
	  export default EditableLabel;
	  ```
	  
	  **Parent component**
	  ```js
	  import { makeStyles } from '@material-ui/core/styles';
	  import EditableLable from '../../../Input/EditableLabel';
	  
	  const useStyles = makeStyles(theme => ({
	  	input: {
	  color: blue,
	  	}
	  }));
	  
	  function Paper(props) {
	  	const classes = useStyles();
	  	return (
	  // 把要覆蓋的 css 傳進去，注意是 classes 不是 className
	  <EditableLabel
	    classes={{ input: classes.input }}
	     />
	  	);
	  }
	  ```