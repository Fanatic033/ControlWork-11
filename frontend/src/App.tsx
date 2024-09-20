import ResponsiveAppBar from "./UI/AppToolBar/AppToolBar.tsx";
import {Route, Routes} from "react-router-dom";
import Login from "./features/User/Login.tsx";
import Register from "./features/User/Register.tsx";

const App = () => {
    return (
        <>
            <header>
                <ResponsiveAppBar/>
            </header>
            <Routes>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
            </Routes>
        </>

    );
};

export default App;