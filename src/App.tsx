import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { fetchAllProducts } from './redux/reducers/productReducer';

const App = () => {
  const products = useAppSelector(state => state.productReducer);
  const dispatch = useAppDispatch();
  console.log(products);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [])
  return (
    <div>App</div>
  )
}

export default App