import {  List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import Box from "@mui/material/Box";
import {Category} from "../../../types.ts";
import Container from "@mui/material/Container";

interface Props {
    categories: Category[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
    const { categoryId } = useParams();

    return (
        <Container>
            <Box >
                <Typography variant="h6">Категории</Typography>
            </Box>
            <Box >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={Link} to="/" selected={!categoryId}>
                            <ListItemText primary="All products" />
                        </ListItemButton>
                    </ListItem>
                    {categories.map((category) => (
                        <ListItem key={category._id} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={`/categories/${category._id}`}
                                selected={category._id === categoryId}
                            >
                                <ListItemText primary={category.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default CategoriesMenu;
