import {Alert, Box, CircularProgress, Container, Typography} from '@mui/material';
import {useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectProducts, selectProductsFetching} from "./ProductsSlice.ts";
import {selectCategories} from "../Category/CategorySlice.ts";
import React, {useEffect, useMemo} from "react";
import {fetchCategories} from "../Category/CategoryThunks.ts";
import {fetchProducts} from "./ProductsThunks.ts";
import ProductCard from "./components/ProductCard.tsx";
import CategoriesMenu from "../Category/components/CategoriesMenu.tsx";


const Products = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector(selectProducts);
    const categories = useAppSelector(selectCategories);
    const isFetching = useAppSelector(selectProductsFetching);
    const {categoryId} = useParams();

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts(categoryId));
    }, [dispatch, categoryId]);

    let content: React.ReactNode = (
        <Alert severity="info" sx={{width: '100%'}}>
            Здесь еще нет продуктов!
        </Alert>
    );

    if (isFetching) {
        content = <div style={{marginTop: '100px',marginLeft:'100px'}}><CircularProgress/></div>;
    } else if (products.length > 0) {
        content = products.map((product) => (
            <ProductCard
                key={product._id}
                id={product._id}
                title={product.title}
                price={product.price}
                image={product.image}
            />
        ));
    }

    const pageTitle = useMemo(() => {
        if (!categoryId) {
            return 'Все Продукты';
        }
        const category = categories.find((category) => category._id === categoryId);
        if (!category) {
            return '...';
        }
        return category.title;
    }, [categories, categoryId]);

    return (
        <Container sx={{display:'flex',marginTop:'20px'}}>
            <Box sx={{width: 200}}>
                <CategoriesMenu categories={categories}/>
            </Box>
            <Container>
                <Container sx={{justifyContent: "space-between", alignItems: "center"}}>
                    <Box>
                        <Typography variant="h4">{pageTitle}</Typography>
                    </Box>
                </Container>
                <Container sx={{display:'flex',flexWrap:'wrap',gap:'20px'}}>
                    {content}
                </Container>
            </Container>
        </Container>
    );
};

export default Products;
