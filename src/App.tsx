import React, { useState } from 'react';
import { useQuery } from 'react-query';

// components
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';


import Item from './Item/item';
import Cart from './Cart/Cart';

// Styles
import { Wrapper, StyledButton } from './App.styles';

export type cartItemType = {
  id: number,
  category: string,
  description: string,
  image: string,
  price: number,
  title: string,
  amount: number
}

const getProducts = async (): Promise<cartItemType[]> => await (await fetch('https://fakestoreapi.herokuapp.com/products')).json()

function App() {
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as cartItemType[])
  const { data, isLoading, error } = useQuery<cartItemType[]>(
    'products',
    getProducts
  );

  
  const getTotalItems = (items: cartItemType[]) => items.reduce((ac: number, item) => ac + item.amount, 0);
  const handleAddToCart = (clickedItem: cartItemType) => {
    setCartItems(prev => {
      const isItemInTheCart = prev.find(item => item.id === clickedItem.id);

      if (isItemInTheCart) {
        return prev.map(item => (
          item.id === clickedItem.id ? {...item, amount: item.amount + 1} : item
        ))
      }

      return [...prev, { ...clickedItem, amount: 1 }]
    })
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => (
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1}]
        } else {
          return [...acc, item]
        }
      }, [] as cartItemType[])
    ))
  };

  if (isLoading) return <LinearProgress />
  if (error) return <div>Something went wrong...</div>
  return (
    <Wrapper>
      <Drawer anchor="right" open={isCartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {
          data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart}/>
            </Grid>
          ))
        }
      </Grid>
    </Wrapper>
  );
}

export default App;
