import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { removeAllItems } from '../redux/reducers/cartReducer';

const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cartReducer);
    return(
        <div>
            <h1>Your cart</h1>
            {cartItems ?            
            <ul>
                {cartItems.map(item => (
                    <li key={item.product.id}>{item.amount} {item.product.title} {item.product.price}</li>
                ))}
            </ul> :
            <div><p>Your cart is empty.</p></div>}

        </div>
    )
}

export default Cart;