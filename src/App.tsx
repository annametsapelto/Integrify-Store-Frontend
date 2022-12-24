import React from 'react'
import { useAppSelector } from './hooks/reduxHook'

const App = () => {
  const products = useAppSelector(state => state.productReducer);
  console.log(products);
  return (
    <div>App</div>
  )
}

export default App