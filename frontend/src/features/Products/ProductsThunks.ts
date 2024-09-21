import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi.ts";
import {ProductMutation, Products} from "../../types.ts";

export const fetchProducts = createAsyncThunk<Products[], string | undefined>(
    'products/fetchAll',
    async (categoryId) => {
        const {data: products} = await axiosApi.get<Products[]>(`/products`, {params: {category: categoryId}});
        return products;
    },
);

export const createProduct = createAsyncThunk<void, ProductMutation>('products/create', async (productMutation) => {
    const formData = new FormData();

    const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
    keys.forEach((key) => {
        const value = productMutation[key];
        if (value !== null) {
            formData.append(key, value);
        }
    });

    await axiosApi.post('/products', formData);
});

export const fetchOneProduct = createAsyncThunk<Products, string>('products/fetchOne', async (id) => {
    const {data: product} = await axiosApi.get<Products>(`/products/${id}`);
    return product;
});
