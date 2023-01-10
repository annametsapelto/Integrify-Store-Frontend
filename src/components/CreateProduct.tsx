import { InputLabel, TextField } from "@mui/material";
import { useAppDispatch } from "../hooks/reduxHook";
import { CreatedProductType } from "../types/ProductType";
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newProduct } from "../validation/newProduct";
import { createProduct } from "../redux/reducers/productReducer";

const CreateProduct = () => {
    const dispatch = useAppDispatch();
    const {handleSubmit, register, watch, formState: {errors}} = useForm<CreatedProductType>({
        resolver: yupResolver(newProduct)
    });

    const onSubmit: SubmitHandler<CreatedProductType> = (data) => {
        console.log("Creating Product" + data.images + data.title)
        dispatch(createProduct(data));
    }

    return (
        <div>
            <h1>Create New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputLabel htmlFor="title">Product title</InputLabel>
                <TextField id="title" type="string" {...register ("title")}></TextField>
                <p>{errors.title?.message}</p>
                <InputLabel htmlFor="description">Description</InputLabel>
                <TextField id="description" type="string" {...register ("description")} multiline rows={5}></TextField>
                <p>{errors.description?.message}</p>
                <InputLabel htmlFor="price">Product price</InputLabel>
                <TextField id="price" type="number" {...register ("price")}></TextField>
                <p>{errors.price?.message}</p>
                <InputLabel htmlFor="category">Categorynumber</InputLabel>
                <TextField id="category" type="number" {...register ("categoryId")}></TextField>
                <p>{errors.categoryId?.message}</p>
                <InputLabel htmlFor="image"></InputLabel>
                <TextField id="image" type="file" {...register ("images")}></TextField>
                <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default CreateProduct;