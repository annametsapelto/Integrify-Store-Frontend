import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { deleteItem, modifyProduct, getOneProduct, fetchAllProducts } from '../redux/reducers/productReducer';
import { addItemToCart } from '../redux/reducers/cartReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.productReducer).filter(prod => prod.id === Number(id))[0];
    let navigate = useNavigate();
    const [pieces, setPieces] = useState(1);

    const deleteItemHandler = (id: number) => {
        dispatch(deleteItem(id));
      }
    
      const modifyHandler = (product: ProductType) => {
        dispatch(modifyProduct({
          ...product,
          title: product.title + " new"
        }))
      }

      const addItems = () => {
        dispatch(addItemToCart({pieces, product}));
      }

    return(
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <img src={product.images[0]} alt={product.title}></img>
                <label htmlFor="pieces">Pieces</label>
                <input 
                    type="number" 
                    id="pieces" 
                    name="pieces" 
                    required 
                    value={pieces} 
                    placeholder="1" 
                    onChange={(event) => setPieces(parseInt(event.target.value))}>
                </input>
                <button onClick={() => addItems()}>Add to cart</button>
            <button onClick={() => navigate(-1)}>Return to products</button>
            <button onClick={() => deleteItemHandler(product.id)}>Delete item</button>
            <button onClick={() => modifyHandler(product)}>Modify</button>
        </div>
    )
}

export default ProductDetail;