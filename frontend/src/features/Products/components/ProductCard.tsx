import React from 'react';
import {Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, styled} from '@mui/material';
import {Link} from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import imageNotFound from '@/assets/images/image-not-found.png';
import {API_URL} from "../../../constants.ts";
import Box from "@mui/material/Box";

const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
});

interface Props {
    id: string;
    title: string;
    price: number;
    image: string | null;
    category: string;
}

const ProductCard: React.FC<Props> = ({id, title, price, image, category}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Box sx={{width: '300px'}}>
            <Card sx={{height: '100%'}}>
                <CardHeader title={title}/>
                <ImageCardMedia image={cardImage} title={title}/>
                <CardContent>
                    <p>Category: {category}</p>
                    <strong>Price: {price} KGS</strong>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} to={`/products/${id}`}>
                        <ArrowForwardIcon/>
                    </IconButton>
                </CardActions>
            </Card>
        </Box>
    );
};

export default ProductCard;
