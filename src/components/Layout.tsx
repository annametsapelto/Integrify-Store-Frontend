import Header from "./Header";
import Footer from "./Footer";
import { BrowserRouter, Routes, Outlet, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Register from "../pages/Register";
import MyProfile from "../pages/MyProfile";
import About from "../pages/About";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";

const Layout = ( ) => {
    return(
    <>
    <BrowserRouter>
    <Header></Header>
    <Outlet />
        <Routes>
            <Route path='' element={<Home />}></Route>
            <Route path='/products' >
                <Route path='' element={<Products/>}></Route>
                <Route path=':id' element={<ProductDetail/>}></Route>
            </Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/profile' element={<MyProfile/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/*' element={<NotFound/>}></Route>
        </Routes>
        </BrowserRouter>
    <Footer></Footer>
    </>
    )
}

export default Layout;