- {{renderer :tocgen}}
- # 套用屬性
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
# [Material-ui/Styles](https://material-ui.com/styles/basics/)
- # withStyles
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
- # makeStyles
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
- # Override child component classes
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