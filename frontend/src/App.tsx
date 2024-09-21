import ResponsiveAppBar from "./UI/AppToolBar/AppToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./features/User/Login.tsx";
import Register from "./features/User/Register.tsx";
import CategoriesMenu from "./features/Category/components/CategoriesMenu.tsx";
import {useAppDispatch, useAppSelector} from "./app/hooks.ts";
import {selectCategories} from "./features/Category/CategorySlice.ts";
import {useEffect} from "react";
import {fetchCategories} from "./features/Category/CategoryThunks.ts";

const App = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <>
            <header>
                <ResponsiveAppBar/>
            </header>
            <CategoriesMenu categories={categories}/>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </>

    );
};

export default App;