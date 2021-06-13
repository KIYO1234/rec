import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import {PrimaryBtn} from './PrimaryBtn'
import { addToCart } from '../users/operations';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginTop: '100px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export const Details = () => {
    // const items = useSelector(state => state)
    // console.log(items)
    const selectedItem = useSelector(state => state.productsReducers.selectedItem)
    console.log(selectedItem);
    const dispatch = useDispatch()
    
    const {tagId} = useParams()
    console.log(tagId)
    // const index = items.findIndex(item => console.log(item))
    // console.log(index)
    
    const classes = useStyles();
    

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardMedia
                    className={classes.media}
                    image={selectedItem.Item.smallImageUrls[0].imageUrl}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {selectedItem.Item.itemName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <Link to='/'>
                          <PrimaryBtn label='カートに追加' onClick={() => dispatch(addToCart(selectedItem))}></PrimaryBtn>
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        </React.Fragment>
    )
}