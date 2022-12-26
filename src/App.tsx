import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './hooks/reduxHook'
import { fetchAllProducts, sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, createProduct, deleteItem, modifyProduct } from './redux/reducers/productReducer';
import { CreatedProductType, ProductType } from './types/ProductType';

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

  const createHandler = () => {
    dispatch(createProduct(newProduct));
  }

  const newProduct: CreatedProductType = {
    title: "Created product",
    description: "A great description",
    price: 24,
    categoryId: 2,
    images: []
  }

  const deleteItemHandler = (id: number) => {
    dispatch(deleteItem(id));
  }

  const modifyHandler = (product: ProductType) => {
    dispatch(modifyProduct({
      ...product,
      title: product.title + " new"
    }))
  }

  return (
    <div>
      <div>
        <button onClick={sortHandlerAsc}>Sort A to Z</button>
        <button onClick={sortHandlerDesc}>Sort Z to A</button>
        <button onClick={sortHandlerPriceAsc}>Sort by Cheapest</button>
        <button onClick={sortHandlerPriceDesc}>Sort by Most Expensive</button>
        <ul>
          {products.map(product => (<li key={product.id}>{product.title}  {product.price} € 
          <button onClick={() => deleteItemHandler(product.id)}>Delete item</button>
          <button onClick={() => modifyHandler(product)}>Modify</button>
          </li>))}
        </ul>
        <button onClick={createHandler}>Create product</button>
      </div>
    </div>
  )
}

export default App