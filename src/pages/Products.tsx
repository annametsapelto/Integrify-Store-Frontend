import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { fetchAllProducts, sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, createProduct, deleteItem, modifyProduct } from '../redux/reducers/productReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';

const Products = () => {
    const [toBeSearched, setToBeSearched] = useState("");
    const products = useAppSelector(state =>  {
        return state.productReducer.filter(item =>  {
         return item.title.toLowerCase().includes(toBeSearched.toLowerCase())}
        )})
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      dispatch(fetchAllProducts());
    }, [])
  
    const sortHandlerAsc = () => {
      dispatch(sortByNameAsc());
    }
  
    const sortHandlerDesc = () => {
      dispatch(sortByNameDesc());
    }
  
    const sortHandlerPriceAsc = () => {
      dispatch(sortByPriceAsc())
    }
  
    const sortHandlerPriceDesc = () => {
      dispatch(sortByPriceDesc());
    }
  
    const createHandler = () => {
      dispatch(createProduct(newProduct));
    }

    const seeDetailsHandler = (product: ProductType) => {
        <Link to={String(product.id)}></Link>
    }
  
    const newProduct: CreatedProductType = {
      title: "Created product",
      description: "A great description",
      price: 24,
      categoryId: 2,
      images: []
    }
  
    return(
        <div>
            <h1>Products</h1>
            <div>
        <label htmlFor='search'>Search for products</label>
        <input type="text" name="search" id='search' value={toBeSearched} onChange={(event) => setToBeSearched(event.target.value)}></input>
      </div>
      <div>
        <button onClick={sortHandlerAsc}>Sort A to Z</button>
        <button onClick={sortHandlerDesc}>Sort Z to A</button>
        <button onClick={sortHandlerPriceAsc}>Sort by Cheapest</button>
        <button onClick={sortHandlerPriceDesc}>Sort by Most Expensive</button>
        <ul>
          {products.map(product => (<li key={product.id} ><Link to={String(product.id)}>{product.title}  {product.price} € <button onClick={(event) => seeDetailsHandler(product)}>See details</button>
          </Link></li>))}
        </ul>
        <button onClick={createHandler}>Create product</button>
      </div>
    </div>
    )
}

export default Products;