import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/reduxHook'
import { fetchAllProducts, sortByNameAsc, sortByNameDesc, sortByPriceAsc, sortByPriceDesc, createProduct } from '../redux/reducers/productReducer';
import { CreatedProductType, ProductType } from '../types/ProductType';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputLabel, Modal, Box } from '@mui/material';
import { fetchAllCategories } from '../redux/reducers/categoryReducer';
import CreateProduct from '../components/CreateProduct';

const Products = () => {
    const [toBeSearched, setToBeSearched] = useState("");
    const [numberOfProducts, setNumberOfProducts] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const products = useAppSelector(state =>  {
        return state.productReducer.filter(item =>  {
         return item.title.toLowerCase().includes(toBeSearched.toLowerCase())}
        )})
    const dispatch = useAppDispatch();
//    const categories = useAppSelector((state) => state.categories);
  
    useEffect(() => {
      dispatch(fetchAllProducts());
      dispatch(fetchAllCategories());
    }, [])

    useEffect(() => {
      setNumberOfProducts(products.length);
    }, [products])
  
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

    const seeDetailsHandler = (product: ProductType) => {
        <Link to={String(product.id)}></Link>
    }

    const handleClose = () => setOpenModal(false); 

    const boxStyle = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
  
    return(
      <div className='products'>
          <h1>Products</h1>
          <div>
            <InputLabel htmlFor='search'>Search for products</InputLabel>
            <TextField  type="text" name="search" id='search' value={toBeSearched} onChange={(event) => setToBeSearched(event.target.value)} variant="outlined"></TextField>
            <SearchIcon fontSize='large'></SearchIcon>
          </div>
        <div>
          <div className='products_filterButtons'>
            <button onClick={sortHandlerAsc}>Sort A to Z</button>
            <button onClick={sortHandlerDesc}>Sort Z to A</button>
            <button onClick={sortHandlerPriceAsc}>Sort by Cheapest</button>
            <button onClick={sortHandlerPriceDesc}>Sort by Most Expensive</button>
          </div>
          <div className='products_number'>
            <p>There are {numberOfProducts} products available</p>
          </div>
          <div>
            <button onClick={() =>setOpenModal(!openModal)}>Create New Product</button>
            <Modal open={openModal} onClose={handleClose}>
              <Box sx={boxStyle}>
                <CreateProduct></CreateProduct>
              </Box>
            </Modal>
          </div>
          <ul className='products_list'>
            {products.map(product => 
              (<li className="products_list_item" key={product.id} >
                <Link to={String(product.id)}>
                  <img src={product.images[0]} alt={product.title}/> 
                  <div className='products_list_texts'>                  
                    <p className='product_list_title'>{product.title}</p> 
                    <p>{product.price} €</p> 
                    <button onClick={(event) => seeDetailsHandler(product)}>See details</button>
                  </div>
                </Link>
              </li>))}
          </ul>
        </div>
      </div>
    )
}

export default Products;