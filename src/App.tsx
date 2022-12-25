import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { fetchAllProducts, sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc } from './redux/reducers/productReducer';

const App = () => {
  const products = useAppSelector(state => state.productReducer);
  const dispatch = useAppDispatch();
  console.log(products);

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

  return (
    <div>
      <div>
        <button onClick={sortHandlerAsc}>Sort A to Z</button>
        <button onClick={sortHandlerDesc}>Sort Z to A</button>
        <button onClick={sortHandlerPriceAsc}>Sort by Cheapest</button>
        <button onClick={sortHandlerPriceDesc}>Sort by Most Expensive</button>
        <ul>
          {products.map(product => (<li key={product.id}>{product.title}  {product.price} €</li>))}
        </ul>
      </div>
    </div>
  )
}

export default App