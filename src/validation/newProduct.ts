import * as yup from 'yup';

export const newProduct = yup.object ({
    title: yup.string().min(3).max(40).required(),
    price: yup.number().min(1).required(),
    description: yup.string().min(5).max(200).required(),
    categoryId: yup.number().min(1).max(5).required()
})