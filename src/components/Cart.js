import { useEffect } from 'react'
import {deleteFromCart, fetchCart} from '../users/operations'
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { setUser } from '../users/operations'
import { setItems} from '../products/operations'
import { PrimaryBtn } from '../components/PrimaryBtn'
import { Autorenew } from '@material-ui/icons';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    margin: '40px auto',
  },
  media: {
    height: 140,
    width: 140
  },
  itemName: {
    maxHeight: 200,
    maxWidth: 200,
  },
  caption: {
    height: 150,
    textOverflow: 'hidden'
  },
  flex: {
    display: 'flex',
  },
  between: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  bottom: {
    marginBottom: 30,
  },
  noCart: {
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
  btnContainer: {
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  link: {
    textDecoration: 'none',
  }
});

export const Cart = () => {
    const classes = useStyles();

    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(setUser())
      dispatch(setItems())
      dispatch(fetchCart())
      console.log('useEffect in Cart.js')
    }, [])

    const cart = useSelector(state => state.usersReducers.cart)
    const sample = useSelector(state => state)
    console.log(sample)
    console.log(cart);
    
    return (
        <>
        <div className={classes.root}>
        {cart.length == undefined &&
          <div>少々お待ちください</div>
        }
        {cart.length > 0 &&
        cart.map(item => (
            <Card className={classes.between + ' ' + classes.bottom}>
                <CardMedia
                className={classes.media}
                image={item.Item.smallImageUrls[0].imageUrl}
                title="Contemplative Reptile"
                />
                <CardContent className={classes.itemName}>
                    <Typography gutterBottom variant="subtitle2" component="h4" >
                        {item.Item.itemName}
                    </Typography>
                    <Typography className={classes.between}>
                      <Typography gutterBottom variant="subtitle1" component="h4">
                        ¥{item.Item.itemPrice}
                      </Typography>
                      <PrimaryBtn label='削除' onClick={() => dispatch(deleteFromCart(item))}></PrimaryBtn>
                    </Typography>
                </CardContent>
            </Card>
        ))
        }
        {cart.length === 0 &&
          <Typography variant='h5' className={classes.noCart}>カートに商品がありません</Typography>
        }
        <Typography className={classes.between + ' ' + classes.btnContainer}>
          <Link to='/' className={classes.link}>
            <PrimaryBtn label='ホーム画面へ'></PrimaryBtn>
          </Link>
          <Link to='/order/confirm' className={classes.link}>
            <PrimaryBtn label='注文に進む'></PrimaryBtn>
          </Link>
        </Typography>
        </div> 
        </>
  );
}




