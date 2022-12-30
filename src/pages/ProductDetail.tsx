import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { deleteItem, modifyProduct, getOneProduct, fetchAllProducts } from '../redux/reducers/productReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';

const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useAppSelector(state => state.productReducer).filter(prod => prod.id === Number(id))[0];
    const deleteItemHandler = (id: number) => {
        dispatch(deleteItem(id));
      }
    
      const modifyHandler = (product: ProductType) => {
        dispatch(modifyProduct({
          ...product,
          title: product.title + " new"
        }))
      }
    return(
        <div>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.price} €</p>
            <img src={product.images[0]} alt={product.title}></img>
            <button onClick={() => deleteItemHandler(product.id)}>Delete item</button>
            <button onClick={() => modifyHandler(product)}>Modify</button>
        </div>
    )
}

export default ProductDetail;