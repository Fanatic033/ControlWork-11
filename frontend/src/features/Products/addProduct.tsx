import ProductForm from './components/ProductForm';
import {Typography} from '@mui/material';
import {Navigate, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectProductCreating} from "./ProductsSlice.ts";
import {ProductMutation} from "../../types.ts";
import {createProduct} from "./ProductsThunks.ts";
import {selectUser} from "../User/UserSlice.ts";

const NewProduct = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isCreating = useAppSelector(selectProductCreating);
    const user = useAppSelector(selectUser);

    if (!user) {
        return <Navigate to="/"/>;
    }


    const onFormSubmit = async (productMutation: ProductMutation) => {
        try {
            await dispatch(createProduct(productMutation));
            navigate('/');
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <Typography variant="h4" sx={{mb: 2, marginLeft: '40px', marginTop: '40px'}}>
                New product
            </Typography>
            <ProductForm onSubmit={onFormSubmit} isLoading={isCreating}/>
        </>
    );
};

export default NewProduct;
