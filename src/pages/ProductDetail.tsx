import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { deleteItem, modifyProduct } from "../redux/reducers/productReducer";
import { addItemToCart } from "../redux/reducers/cartReducer";
import { CreatedProductType } from "../types/ProductType";
import { InputLabel, TextField } from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.productReducer).filter(
    (prod) => prod.id === Number(id)
  )[0];
  let navigate = useNavigate();
  const [amount, setAmount] = useState(1);
  const [productTitle, setProductTitle] = useState(product.title);
  const [productPrice, setProductPrice] = useState(product.price);
  const [productDesc, setProductDesc] = useState(product.description);
  const [productCategoryId, setProductCategoryId] = useState(
    product.category.id
  );
  const [image1, setImage1] = useState(product.images[0]);
  const [image2, setImage2] = useState(product.images[1]);
  const [image3, setImage3] = useState(product.images[2]);
  const [showModify, setShowModify] = useState(false);

  const deleteItemHandler = (id: number) => {
    dispatch(deleteItem(id));
    navigate(-1);
  };

  const modifyHandler = () => {
    setShowModify(!showModify);
  };

  const addItems = () => {
    const total = amount * product.price;
    dispatch(addItemToCart({ amount, product, total }));
  };

  const handleModify = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newProduct: CreatedProductType = {
      title: productTitle,
      price: productPrice,
      description: productDesc,
      categoryId: productCategoryId,
      images: [image1, image2, image3],
    };
    console.log(newProduct.title);
    dispatch(modifyProduct({ id: product.id, update: newProduct }));
  };

  return (
    <div className="product">
      <button className="product_return" onClick={() => navigate(-1)}>
        Return to products
      </button>
      <h1>{product.title}</h1>
      <p className="product_desc">{product.description}</p>
      <p className="product_price">Our price: {product.price} €</p>
      <div>
        <img src={product.images[0]} alt={product.title}></img>
      </div>
      <div className="product_add">
        <InputLabel htmlFor="pieces">Pieces </InputLabel>
        <TextField
          type="number"
          id="pieces"
          name="pieces"
          required
          value={amount}
          placeholder="1"
          onChange={(event) => setAmount(parseInt(event.target.value))}
        ></TextField>
        <button onClick={() => addItems()}>Add to cart</button>
      </div>
      <div>
        <h2>Controls</h2>
        <button onClick={() => deleteItemHandler(product.id)}>
          Delete item
        </button>
        <button onClick={() => modifyHandler()}>Modify</button>
      </div>
      {showModify && (
        <div>
          <form>
            <InputLabel htmlFor="productTitle">Title</InputLabel>
            <TextField
              type="string"
              id="productTitle"
              name="productTitle"
              placeholder={product.title}
              value={productTitle}
              onChange={(event) => setProductTitle(event.target.value)}
            ></TextField>
            <InputLabel htmlFor="productPrice">Price</InputLabel>
            <TextField
              type="number"
              id="productPrice"
              name="productPrice"
              placeholder={product.price.toString()}
              value={productPrice}
              onChange={(event) =>
                setProductPrice(parseInt(event.target.value))
              }
            ></TextField>
            <InputLabel htmlFor="productDesc">Description</InputLabel>
            <TextField
              type="string"
              id="productDesc"
              name="productDesc"
              placeholder={product.description}
              value={productDesc}
              onChange={(event) => setProductDesc(event.target.value)}
            ></TextField>
            <InputLabel htmlFor="productCategory">Category Id (1-5)</InputLabel>
            <TextField
              type="number"
              id="productCategory"
              name="productCategory"
              placeholder={product.category.toString()}
              value={productCategoryId}
              onChange={(event) =>
                setProductCategoryId(parseInt(event.target.value))
              }
            ></TextField>
            <InputLabel htmlFor="productImage1">Images</InputLabel>
            <TextField
              type="string"
              id="productImage1"
              name="productImage1"
              placeholder={product.images[0]}
              value={image1}
              onChange={(event) => setImage1(event.target.value)}
            ></TextField>
            <TextField
              type="string"
              id="productImage2"
              name="productImage2"
              placeholder={product.images[0]}
              value={image2}
              onChange={(event) => setImage2(event.target.value)}
            ></TextField>
            <TextField
              type="string"
              id="productImage3"
              name="productImage3"
              placeholder={product.images[0]}
              value={image3}
              onChange={(event) => setImage3(event.target.value)}
            ></TextField>
            <button type="submit" onSubmit={(event) => handleModify(event)}>
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
