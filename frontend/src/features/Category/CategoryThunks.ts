import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi.ts";
import {Category} from "../../types.ts";

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
    const { data: categories } = await axiosApi.get<Category[]>('/categories');
    return categories;
});
