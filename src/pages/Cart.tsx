import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import {
  removeAllItems,
  removeItemFromCart,
  decreaseQuantity,
  increaseQuantity,
} from "../redux/reducers/cartReducer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CartItemType } from "../types/CartItemType";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const dispatch = useAppDispatch();
  const cartItems: CartItemType[] = useAppSelector(
    (state) => state.cartReducer
  );

  useEffect(() => {
    setCartTotal(cartItems.reduce((acc, items) => acc + items.total, 0));
  }, [cartItems]);

  return (
    <div className="cart">
      <h1>Your cart</h1>
      {cartItems.length > 0 ? (
        <div>
          <p>Your cart has {cartItems.length} items</p>
          <ul className="cart_list">
            {cartItems.map((item) => (
              <li key={item.product.id} className="cart_list_item">
                <button
                  onClick={() => dispatch(decreaseQuantity(item))}
                  disabled={item.amount === 1}
                >
                  <RemoveIcon />
                </button>
                {item.amount}
                <button
                  onClick={() => dispatch(increaseQuantity(item))}
                  disabled={item.amount === 10}
                >
                  <AddIcon />
                </button>
                {item.product.title} {item.product.price} € Subtotal:{" "}
                {item.total} €
                <button onClick={() => dispatch(removeItemFromCart(item))}>
                  Remove item
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => dispatch(removeAllItems())}>
            Remove all items
          </button>
          <div>
            <h2>Total: {cartTotal} €</h2>
            <button>Place order</button>
          </div>
        </div>
      ) : (
        <div>
          <p>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
