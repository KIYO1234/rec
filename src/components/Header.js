
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { PrimaryBtn } from './PrimaryBtn'
import { signIn, signOut } from '../users/operations'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
      marginLeft: 'auto',
  }
}));

export const Header = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  
  
  const loginUser = useSelector(state => state.usersReducers.loginUser)
//   console.log(loginUser);

  const cartLength = useSelector(state => state.usersReducers.cart.length)

 const history = useHistory()
  // console.log(history)
  const link = path => {
      history.push(path)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => link('/')}>
                <HomeIcon />
            </IconButton>
          {loginUser &&
            <Typography variant="h6" className={classes.title}>
                ようこそ！{loginUser.displayName}様
            </Typography>
          }
          <IconButton onClick={() => link('/cart')} color='inherit'>
            <Badge badgeContent={cartLength} color='secondary'>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <Typography className={classes.btn}>
            {
              loginUser ?
              <PrimaryBtn label='ログアウト' onClick={() => dispatch(signOut())}/>
              :
              <PrimaryBtn label='ログイン' onClick={() => dispatch(signIn())} />
            }
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
