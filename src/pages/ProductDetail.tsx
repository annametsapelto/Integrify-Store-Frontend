import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { deleteItem, modifyProduct, getOneProduct, fetchAllProducts } from '../redux/reducers/productReducer';
import { addItemToCart } from '../redux/reducers/cartReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';
import { InputLabel, TextField } from '@mui/material';

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
        <div className='product'>
          <button className="product_return" onClick={() => navigate(-1)}>Return to products</button>
          <h1>{product.title}</h1>
          <p className='product_desc'>{product.description}</p>
          <p className='product_price'>Our price: {product.price} €</p>
          <div>
            <img src={product.images[0]} alt={product.title}></img>
          </div>
          <div className='product_add'>
            <InputLabel htmlFor="pieces">Pieces </InputLabel>
            <TextField 
              type="number" 
              id="pieces" 
              name="pieces" 
              required 
              value={pieces} 
              placeholder="1" 
              onChange={(event) => setPieces(parseInt(event.target.value))}>
            </TextField>
            <button onClick={() => addItems()}>Add to cart</button>
          </div>
          <div>
            <h2>Controls</h2>
            <button onClick={() => deleteItemHandler(product.id)}>Delete item</button>
            <button onClick={() => modifyHandler(product)}>Modify</button>
          </div>
      </div>
    )
}

export default ProductDetail;