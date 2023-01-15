import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import categoryReducer, { fetchAllCategories } from "../redux/reducers/categoryReducer";
import { createStore } from '../redux/store';


const Categories = () => {
    const dispatch = useAppDispatch();
    const store = createStore;

    useEffect(() => {
        dispatch(fetchAllCategories())
    }, [])
    const categories = useAppSelector((state) => state.categoryReducer);
    return (
        <div>
            <h3>Categories</h3>
            <div>
                <ul>
                    {categories.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Categories