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
        if (products && products.length > 30) {
            console.log("We have products" + products.length)
            getFeatured()
        }
    }, [])

    const getFeatured = () => {
        let tempArray: ProductType[] = [];
        tempArray.push(products[10]);
        tempArray.push(products[20]);
        tempArray.push(products[30]);
        setFeatured(tempArray);
    }

    return (
        <div> 
            {products && featured !== undefined ? 
            <ul className='home_featured'>{
                featured.map(product => (
                <li key={product.id} >
                    <Link 
                    to={`/products/`+ String(product.id)}><img src={product.images[0]}></img><p>{product.title}  {product.price} € </p>
                    <button>See details</button>
                    </Link>
                </li>))}
            </ul>
            :
            <p>Sorry, we could not find products to show.</p>
        }


            
        </div>
    )
}

export default Featured;