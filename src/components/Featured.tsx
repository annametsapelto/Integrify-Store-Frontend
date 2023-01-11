import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { fetchAllProducts } from '../redux/reducers/productReducer';
import { ProductType } from '../types/ProductType';

const Featured = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.productReducer);
    const [featured, setFeatured] = useState<ProductType[]>([]);

    const getFeatured = () => {
        let tempArray: ProductType[] = [];
        tempArray.push(products[10]);
        tempArray.push(products[20]);
        tempArray.push(products[30]);
        window.localStorage.setItem('featured', JSON.stringify(tempArray));
    }    
    useEffect(() => {
        dispatch(fetchAllProducts());
      }, [dispatch])
      
    useEffect(() => {
        if (products && products.length > 30) {
            getFeatured()
            const array = JSON.parse(window.localStorage.featured)
            setFeatured(array);
        }
    }, [])

    return (
        <div> 
            {products && featured[0] !== undefined ? 
            <ul className='home_featured'>{
                featured.map(product => (
                <li key={product.id} >
                    <Link 
                    to={`/products/`+ String(product.id)}><img src={product.images[0]} alt={product.title}></img><p>{product.title}  {product.price} € </p>
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