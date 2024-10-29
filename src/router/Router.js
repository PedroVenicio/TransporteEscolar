import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../screens/Home';
import HomeGeral from '../screens/HomeGeral';
import Login from '../screens/Login';
import Usuario from '../screens/Usuario';
import Van from '../screens/Van';
import Frota from "../screens/Frota";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<HomeGeral />} />
                <Route path="/Frota" element={<Frota/>}/>
                <Route path="/Home"   element={<Home />} />
                <Route path="/HomeGeral"   element={<HomeGeral />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/Usuario"  element={<Usuario />} />
                <Route path="/Van" element={<Van />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;