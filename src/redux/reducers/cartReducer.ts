import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemType } from '../../types/CartItemType';

export const getFromLocalStorage = (): CartItemType[] => {
    const cart = localStorage.getItem("cart");
        if (cart) {
            return JSON.parse(cart);
        } else {
            return []
        }
}

const saveToLocalStorage = (data: CartItemType[]) => {
    localStorage.setItem("cart", JSON.stringify(data));
}

const initialState: CartItemType[] = getFromLocalStorage();

const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItemType>) => {
            const localStorageData = getFromLocalStorage();
            const itemFoundInCart = localStorageData.find((item) => item.product.id === action.payload.product.id);
                if (itemFoundInCart) {
                    const cart = localStorageData.map((item) => {
                        if (item.product.id === action.payload.product.id) {
                          let totalQuantity = item.amount + action.payload.amount;
                          let totalPrice = totalQuantity * item.product.price;
                          return {
                            ...itemFoundInCart,
                            amount: totalQuantity,
                            total: totalPrice,
                          };
                        } else {
                          return item;
                        }
                      });
                      saveToLocalStorage(cart);
                      return (state = cart);
                    } else {
                      saveToLocalStorage([...localStorageData, action.payload]);
                      return (state = [...localStorageData, action.payload]);
                    }
                  },
        removeItemFromCart: (state, action: PayloadAction<CartItemType>) => {
            const localStorageData = getFromLocalStorage();
            const cart = localStorageData.filter((item) => {
            return item.product.id !== action.payload.product.id;
        });
            saveToLocalStorage(cart);
            return (state = cart);
        },
        increaseQuantity: (state, action: PayloadAction<CartItemType>) => {
            const localStorageData = getFromLocalStorage();
            const item = localStorageData.find(
              (item) => item.product.id === action.payload.product.id
            );
            if (item) {
              item.amount++;
              item.total = item.amount * item.product.price;
              saveToLocalStorage(localStorageData);
              return (state = localStorageData);
            } else {
              return state;
            }
          },
          decreaseQuantity: (state, action: PayloadAction<CartItemType>) => {
            const localStorageData = getFromLocalStorage();
            const item = localStorageData.find(
              (item) => item.product.id === action.payload.product.id
            );
            if (item) {
              if (item.amount > 1) {
                item.amount--;
                item.total = item.amount * item.product.price;
                saveToLocalStorage(localStorageData);
                return (state = localStorageData);
              } else {
                item.amount = 1;
                item.total = item.amount * item.product.price;
                saveToLocalStorage(localStorageData);
                return (state = localStorageData);
              }
            }
          },
        removeAllItems: (state) => {
            state.length = 0;
        },
    }
})

export default cartSlice.reducer;
export const { addItemToCart, removeAllItems, removeItemFromCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
