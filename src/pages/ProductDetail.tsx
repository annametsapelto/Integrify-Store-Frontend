import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { deleteItem, modifyProduct, getOneProduct } from '../redux/reducers/productReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';

const ProductDetail = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();
    const product: ProductType = {
        id: 2,
        title: "Carving",
        price: 55,
        description: "A description",
        images: [],
        category: {
            id: 3,
            name: "Furniture",
            image: ""
        }}
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
            <h1>Product detail</h1>
            <button onClick={() => deleteItemHandler(product.id)}>Delete item</button>
          <button onClick={() => modifyHandler(product)}>Modify</button>
        </div>
    )
}

export default ProductDetail;