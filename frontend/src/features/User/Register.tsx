import React, {useState} from 'react';
import {Avatar, Box, Link, TextField, Typography} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as NavLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {RegisterMutation} from '../../types.ts';
import {selectRegisterError, selectRegisterLoading} from './UserSlice.ts';
import {register} from './UserThunks.ts';
import {LoadingButton} from '@mui/lab';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectRegisterError)
    const btnLoading = useAppSelector(selectRegisterLoading)

    const [state, setState] = useState<RegisterMutation>({
        username: '',
        password: '',
        nickname: '',
        phoneNumber: '',
    });

    const getFieldError = (fieldName: string) => {
        return error?.errors[fieldName]?.message;
    };


    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submitFormHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await dispatch(register(state)).unwrap();
            navigate('/');
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <Box
            sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'white',
                width: '600px',
                height: '600px',
                borderRadius: '3%',
                margin: '50px auto',
            }}
        >
            <Avatar sx={{m: 7, bgcolor: 'success.main'}}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Зарегестрироваться
            </Typography>
            <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
                <Box sx={{width: '100%', maxWidth: 400, mt: 2}}>
                    <TextField
                        required
                        label="Username"
                        name="username"
                        autoComplete="new-username"
                        value={state.username}
                        onChange={inputChangeHandler}
                        fullWidth
                        margin="normal"
                        error={Boolean(getFieldError('username'))}
                        helperText={getFieldError('username')}
                    />
                    <TextField
                        required
                        type="password"
                        label="Password"
                        name="password"
                        autoComplete="new-password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        fullWidth
                        margin="normal"
                        error={Boolean(getFieldError('password'))}
                        helperText={getFieldError('password')}
                    /> <TextField
                    required
                    type="phoneNumber"
                    label="phoneNumber"
                    name="phoneNumber"
                    autoComplete="new-phoneNumber"
                    value={state.phoneNumber}
                    onChange={inputChangeHandler}
                    fullWidth
                    margin="normal"
                    error={Boolean(getFieldError('phoneNumber'))}
                    helperText={getFieldError('phoneNumber')}
                /> <TextField
                    required
                    type="nickname"
                    label="Nickname"
                    name="nickname"
                    autoComplete="new-nickname"
                    value={state.nickname}
                    onChange={inputChangeHandler}
                    fullWidth
                    margin="normal"
                    error={Boolean(getFieldError('nickname'))}
                    helperText={getFieldError('nickname')}
                />
                </Box>
                <LoadingButton type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} loading={btnLoading}>
                    Регистрация
                </LoadingButton>
                <Link component={NavLink} to={'/login'} variant="body2" sx={{textDecoration: 'none'}}>
                    <span style={{color: 'gray'}}>У вас уже есть аккаунт ?</span> Войти в систему
                </Link>
            </Box>
        </Box>
    );
};

export default Register;