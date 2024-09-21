import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';
import {usersReducer} from "../features/User/UserSlice.ts";
import {categoriesReducer} from "../features/Category/CategorySlice.ts";
import {productsReducer} from "../features/Products/ProductsSlice.ts";

const usersPersistConfig = {
    key: 'controlWork',
    storage,
    whiteList: ['user'],
}

const rootReducer = {
    users: persistReducer(usersPersistConfig, usersReducer),
    categories: categoriesReducer,
    products: productsReducer,
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    },
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;