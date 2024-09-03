import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../screens/Home';
import Login from '../screens/Login';
import Usuario from '../screens/Usuario';

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/home"   element={<Home />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/Usuario"  element={<Usuario />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;