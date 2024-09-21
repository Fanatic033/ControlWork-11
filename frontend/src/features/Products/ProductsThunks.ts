import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi.ts";
import {GlobalError, ProductMutation, Products} from "../../types.ts";
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

export const fetchProducts = createAsyncThunk<Products[], string | undefined>(
    'products/fetchAll',
    async (categoryId) => {
        const {data: products} = await axiosApi.get<Products[]>(`/products`, {params: {category: categoryId}});
        return products;
    },
);

export const createProduct = createAsyncThunk<void, ProductMutation, {
    rejectValue: GlobalError, state: RootState
}>('products/create', async (productMutation, {rejectWithValue, getState}) => {
    try {
        const formData = new FormData();

        const keys = Object.keys(productMutation) as (keyof ProductMutation)[];
        keys.forEach((key) => {
            const value = productMutation[key];
            if (value !== null) {
                formData.append(key, value);
            }
        });

        const token = getState().users.user?.token;
        if (!token) {
            console.error('No user token found');
        }
        await axiosApi.post('/products', formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 400) {
            return rejectWithValue(e.response.data)
        }
        throw e
    }
});

export const fetchOneProduct = createAsyncThunk<Products, string>('products/fetchOne', async (id) => {
    const {data: product} = await axiosApi.get<Products>(`/products/${id}`);
    return product;
});

export const deleteProduct = createAsyncThunk<void, string, {
    rejectValue: GlobalError, state: RootState
}>('products/delete', async (id, {rejectWithValue, getState}) => {
    try {
        const token = getState().users.user?.token;
        if (!token) {
            console.error('No user token found');
            return;
        }

        await axiosApi.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (e) {
        if (isAxiosError(e) && e.response && e.response.status === 404) {
            return rejectWithValue(e.response.data);
        }
        throw e;
    }
});
