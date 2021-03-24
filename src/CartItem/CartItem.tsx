import Button from '@material-ui/core/Button';

import { cartItemType } from '../App';
import { Wrapper } from '../CartItem/CartItem.styles';

type props = {
    item: cartItemType,
    addToCart: (clickedItem: cartItemType) => void;
    removeFromCart: (id: number) => void;
}

const CartItem: React.FC<props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button size="small" disableElevation variant="contained" onClick={() => removeFromCart(item.id)}>
                    -
                </Button>
                <p>{item.amount}</p>
                <Button size="small" disableElevation variant="contained" onClick={() => addToCart(item)}>
                    +
                </Button>
            </div>
        </div>
        <img  src={item.image.replace("fakestoreapi.com", "fakestoreapi.herokuapp.com")} alt={item.title}/>
    </Wrapper>
)

export default CartItem;
