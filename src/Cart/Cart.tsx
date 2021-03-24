import CartItem from '../CartItem/CartItem';

import { Wrapper } from './Cart.styles';
import { cartItemType } from '../App';

type props = {
    cartItems: cartItemType[],
    addToCart: (clickedItem: cartItemType) => void;
    removeFromCart: (id: number) => void;
}

const Cart: React.FC<props> = ({ cartItems, addToCart, removeFromCart}) => {
    const calculateTotal = (items: cartItemType[]) =>
       items.reduce((acc: number, item) => acc + item.amount * item.price, 0)
    return (
        <Wrapper>
            <h2>Shopping Cart</h2>
            {cartItems.length === 0 ? <p>No Items in the cart</p> : null}
            {cartItems.map(item => (
                <CartItem item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
            ))}
            <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
        </Wrapper>
    )
}

export default Cart;
