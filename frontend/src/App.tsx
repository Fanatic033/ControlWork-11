import ResponsiveAppBar from "./UI/AppToolBar/AppToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./features/User/Login.tsx";
import Register from "./features/User/Register.tsx";
import ProductsPage from "./features/Products/ProductsPage.tsx";

const App = () => {

    return (
        <>
            <header>
                <ResponsiveAppBar/>
            </header>
            <Routes>
                <Route path={'/'} element={<ProductsPage/>}/>
                <Route path="/categories/:categoryId" element={<ProductsPage/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </>

    );
};

export default App;