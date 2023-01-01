import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { fetchAllProducts } from '../redux/reducers/productReducer';
import { ProductType } from '../types/ProductType';

const Featured = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.productReducer);
    const [featured, setFeatured] = useState<ProductType[]>([]);
    
    useEffect(() => {
        dispatch(fetchAllProducts());
      }, [])
      
    useEffect(() => {
        console.log("Products: " + products[0]);
        getFeatured()
    }, [])

    const getFeatured = () => {
        let tempArray: ProductType[] = [];
        tempArray.push(products[10]);
        tempArray.push(products[20]);
        tempArray.push(products[30]);
        setFeatured(tempArray);
        console.log("Featured: " + featured[0]);
    }


    const seeDetailsHandler = (product: ProductType) => {
        <Link to={String(product.id)}></Link>
    }

    return (
        <div>
            {products !== undefined && 
                <ul>{
                    featured.map(product => (<li key={product.id} >
                        <Link to={String(product.id)}>{product.title}  {product.price} € <button onClick={(event) => seeDetailsHandler(product)}>See details</button>
                        </Link></li>))}
                </ul>}

            
        </div>
    )
}

export default Featured;