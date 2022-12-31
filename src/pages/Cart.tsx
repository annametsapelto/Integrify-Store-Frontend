import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { removeAllItems, incrementAmount, decrementAmount } from '../redux/reducers/cartReducer';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const Cart = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cartReducer);

    useEffect(() => {
        console.log("Cart:" + cartItems.length)
    }, [])
    return(
        <div>
            <h1>Your cart</h1>
            {cartItems[0] != undefined ?    
            <div> 
                <ul>
                    {cartItems.map(item => (
                    <li key={item.product.id}>
                        <button onClick={() => dispatch(decrementAmount(item))}><RemoveIcon/></button>
                        {item.amount} 
                        <button onClick={() => dispatch(incrementAmount(item))}><AddIcon/></button> 
                        {item.product.title} {item.product.price}
                    </li>
                ))}
                </ul> 
                <button onClick={() => dispatch(removeAllItems())}>Remove all items</button>
            </div>        
            :
            <div><p>Your cart is empty.</p></div>}
        </div>
    )
}

export default Cart;