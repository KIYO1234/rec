import '../App.css';
import {searchItem, setItems} from '../products/operations'
import {setItem} from '../products/actions'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Link } from "react-router-dom";
import { PrimaryBtn } from './PrimaryBtn'
import { setUser } from '../users/operations'
import { fetchCart } from '../users/operations'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '20ch',
    },
  },
  main: {
    maxWidth: '80%',
    margin: '0 auto',
  },
  searchField: {
    height: '42px'
  },
  searchBtn: {
    width: '10ch',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxHeight: '300px',
  },
  media: {
    height: '100px',
    // paddingTop: '56.25%', // 16:9
  },
  description: {
    fontSize: '15px',
    maxHeight: '150px',
    overflow: 'hidden'
  },
  link: {
    textDecoration: 'none'
  }
}));


function App() {
  // useSelector(state => console.log(state))
  const classes = useStyles();
  const dispatch = useDispatch()
  const items = useSelector(state => state.productsReducers.items)  
  const sample = useSelector(state => state)
  console.log(sample)
   
  // const items = [
  //   // {Item: 
  //   //   {itemName: 'テニス', url: 'https://media.istockphoto.com/photos/fresh-flowers-in-ice-cream-cone-still-life-picture-id473082752?s=612x612'}
  //   // },
  //   // {Item: 
  //   //   {itemName: 'サッカー', url: 'https://media.istockphoto.com/photos/fresh-flowers-in-ice-cream-cone-still-life-picture-id473082752?s=612x612'}
  //   // },
  //   // {Item: 
  //   //   {itemName: '野球', url: 'https://media.istockphoto.com/photos/fresh-flowers-in-ice-cream-cone-still-life-picture-id473082752?s=612x612'}
  //   // },
  // ]
  
  useEffect(() => {
    console.log('useEffect in App.js')
    dispatch(setItems())
    dispatch(setUser())
    dispatch(fetchCart())
  }, [])
  console.log(items)
  
  const [keyword, setKeyword] = useState()
  const changeKeyword = e => {
    // console.log(e.target.value)
    setKeyword(e.target.value)
    // console.log(keyword)
  }

  return (
    <div className="App">
      <Paper className={classes.main} elevation={0}>
        <h1>楽天市場</h1>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="outlined-basic" label="商品名を入力" variant="outlined" onChange={e => changeKeyword(e)} />
          <PrimaryBtn color='primary' variant='contained' className={classes.searchBtn} onClick={() => dispatch(searchItem(keyword))} label='検索'></PrimaryBtn>
        </form>
        <Grid container spacing={3}> 
          
         {
           items &&
           items.map(item => 
            <Grid item xs={4} key={item.Item.itemUrl}>
              <Link to={`details/${item.Item.tagIds[0]}`} onClick={() => dispatch(setItem(item))} className={classes.link}>
                  <Paper className={classes.paper}>
                    <CardMedia className={classes.media} image={item.Item.smallImageUrls[0].imageUrl}></CardMedia>
                    <Box className={classes.description}> {item.Item.itemName}</Box>
                  </Paper>
              </Link>
            </Grid>
           )
         }
         {
           !items &&
           <div>少々お待ちください...</div>
         }
        </Grid>
      </Paper>

    </div>
  );
}

export default App;
