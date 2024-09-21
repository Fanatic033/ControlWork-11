import React, {useEffect, useState} from 'react';
import {CircularProgress, MenuItem, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import {Editor} from '@tinymce/tinymce-react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectCategories, selectCategoriesFetching} from "../../Category/CategorySlice.ts";
import {ProductMutation} from "../../../types.ts";
import {fetchCategories} from '../../Category/CategoryThunks.ts';
import FileInput from "../../../UI/FileInput/FileInput.tsx";

interface Props {
    onSubmit: (product: ProductMutation) => void;
    isLoading: boolean;
}

const styles = {
    formGroup: {
        marginBottom: '16px',
    }
}

const ProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {

    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const categoriesFetching = useAppSelector(selectCategoriesFetching);

    const [state, setState] = useState<ProductMutation>({
        salesman: '',
        category: '',
        title: '',
        description: '',
        price: '',
        image: null,
    });
    
    const [descriptionError, setDescriptionError] = useState<string | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const submitFormHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if (!state.description) {
            setDescriptionError('Description is required');
            return;
        }
        if (!state.image) {
            setImageError('Image is required');
            return;
        }

        setImageError(null)
        setDescriptionError(null);
        onSubmit({...state});
    };

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = event.target;
        const value = files && files[0] ? files[0] : null;

        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const editorChangeHandler = (value: string) => {
        setState((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    return (
        <form onSubmit={submitFormHandler} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '600px',
            margin: '0 auto',
        }}>
            <div style={styles.formGroup}>
                {categoriesFetching ? (
                    <CircularProgress/>
                ) : (
                    <TextField
                        required
                        select
                        label="Category"
                        id="category"
                        name="category"
                        value={state.category}
                        onChange={inputChangeHandler}
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Select category
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category._id}>
                                {category.title}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            </div>
            <div style={styles.formGroup}>
                <TextField
                    required
                    label="Title"
                    id="title"
                    name="title"
                    value={state.title}
                    onChange={inputChangeHandler}
                    fullWidth
                />
            </div>
            <div style={styles.formGroup}>
                <Editor
                    licenseKey="gpl"
                    tinymceScriptSrc="/tinymce/tinymce.min.js"
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist',
                            'autolink',
                            'lists',
                            'link',
                            'image',
                            'charmap',
                            'anchor',
                            'searchreplace',
                            'visualblocks',
                            'code',
                            'fullscreen',
                            'insertdatetime',
                            'media',
                            'table',
                            'preview',
                            'help',
                            'wordcount',
                        ],
                        toolbar:
                            'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Roboto,Arial,sans-serif; font-size:14px }',
                    }}
                    value={state.description}
                    onEditorChange={editorChangeHandler}
                />
                {descriptionError && (
                    <Typography color="error" variant="body2">
                        {descriptionError}
                    </Typography>
                )}
            </div>
            <div style={styles.formGroup}>
                <TextField
                    required
                    type="number"
                    label="Price"
                    id="price"
                    name="price"
                    value={state.price}
                    onChange={inputChangeHandler}
                    fullWidth
                />
            </div>
            <div style={styles.formGroup}>
                <FileInput label="Image" name="image" onChange={fileInputChangeHandler}/>
                {imageError && (
                    <Typography color="error" variant="body2">
                        {imageError}
                    </Typography>
                )}
            </div>
            <div style={styles.formGroup}>
                <LoadingButton
                    type="submit"
                    loading={isLoading}
                    loadingPosition="start"
                    startIcon={<SaveIcon/>}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </div>
        </form>
    );
};

export default ProductForm;
