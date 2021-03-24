import React from 'react'

import Button from '@material-ui/core/Button';
import { cartItemType } from '../App';
import { Wrapper } from './item.styles';

type props = {
    item: cartItemType,
    handleAddToCart: (clickedItemType: cartItemType) => void;
}

const Item: React.FC<props> = ({ item, handleAddToCart }) => (
    <Wrapper>
        <img src={item.image.replace("fakestoreapi.com", "fakestoreapi.herokuapp.com")} alt={item.title} />
        <div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h3>${item.price}</h3>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
    </Wrapper>
)

export default Item;
