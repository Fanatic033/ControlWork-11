import {useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Box, Button, Card, CardMedia, CircularProgress, Container, List, styled, Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectOneProduct, selectOneProductFetching} from "./ProductsSlice.ts";
import {deleteProduct, fetchOneProduct} from "./ProductsThunks.ts";
import imageNotFound from '@/assets/images/image-not-found.png';
import {API_URL} from "../../constants.ts";
import Divider from '@mui/material/Divider';
import {selectUser} from "../User/UserSlice.ts";

const MyCard = styled(Card)({
    display: 'flex',
    flexDirection: 'column',
    height: 'auto',
    width: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
    borderRadius: '10px',
    border: '2px solid #3f51b5',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    padding: '20px',
});

const ImageCardMedia = styled(CardMedia)({
    width: '100%',
    height: '350px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginTop: '10px',
    marginBottom: '20px',
});


const OneProduct = () => {
    const navigate = useNavigate();
    const {id} = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const product = useAppSelector(selectOneProduct);
    const isFetching = useAppSelector(selectOneProductFetching);
    const user = useAppSelector(selectUser);

    const handleClick = () => {
        if (window.confirm("Are you sure?")) {
            if (product) {
                dispatch(deleteProduct(product._id))
                navigate('/')
            }
        }
    }

    let cardImage = imageNotFound;

    if (product?.image) {
        cardImage = `${API_URL}/${product?.image}`;
    }

    useEffect(() => {
        dispatch(fetchOneProduct(id));
    }, [dispatch, id]);

    return (
        <Container>
            <Box>
                <Button variant="text" startIcon={<ArrowBackIcon/>} component={Link} to="/">
                    Back to products
                </Button>
            </Box>
            {isFetching && (
                <Box>
                    <CircularProgress/>
                </Box>
            )}
            {product && (
                <>

                    <MyCard>
                        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Typography variant="subtitle1">
                                Категория {product.category?.title}
                            </Typography>
                            <Typography variant="h6" sx={{color: 'red'}}>
                                {product.price} KGS

                            </Typography>
                        </Box>
                        <Divider component={List}/>
                        <Box component={Typography} variant="h4" sx={{textAlign: 'center', marginBottom: '10px'}}>
                            {product.title}
                        </Box>
                        <ImageCardMedia image={cardImage}/>
                        <Divider component={List}/>
                        <Box component={Typography} variant="body1"
                             dangerouslySetInnerHTML={{__html: product.description}}
                             sx={{textAlign: 'center', marginBottom: '20px'}}/>

                        {user && user._id === product.salesman._id  ? (
                            <Button onClick={handleClick} variant={'outlined'}>Delete</Button>
                        ) : (
                            <p style={{display: 'none'}}></p>
                        )}
                        <Divider component={List}/>
                        <Box component={Typography} variant="subtitle1" sx={{textAlign: 'center', marginTop: '10px'}}>
                            Автор: {product.salesman?.nickname}
                        </Box>
                        <Box component={Typography} variant="subtitle2" sx={{textAlign: 'center'}}>
                            Телефон: {product.salesman?.phoneNumber}
                        </Box>
                    </MyCard>

                </>
            )}
        </Container>
    );
};

export default OneProduct;
