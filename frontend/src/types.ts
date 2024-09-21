export interface Category {
    _id: string;
    title: string;
    description: string | null;
}

export interface Products {
    _id: string;
    salesman: {
        _id: string;
        nickname: string;
        phoneNumber: string;
    }
    category: {
        _id: string;
        title: string;
    };
    title: string;
    description: string;
    price: number;
    image: string | null;
}

export interface ProductMutation {
    salesman: string;
    category: string;
    title: string;
    description: string;
    price: string;
    image: File | null;
}

export interface RegisterMutation {
    username: string;
    password: string;
    nickname: string;
    phoneNumber: string;
}

export interface LoginMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    nickname: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        };
    };
    message: string;
    name: string;
    _message: string;
}


export interface GlobalError {
    error: string;
}