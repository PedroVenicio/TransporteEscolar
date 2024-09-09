import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from '../screens/Home';
import Login from '../screens/Login';
import Usuario from '../screens/Usuario';
import Motorista from '../screens/Motorista';
import Van from '../screens/Van';

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/home"   element={<Home />} />
                <Route path="/login"  element={<Login />} />
                <Route path="/Usuario"  element={<Usuario />} />
                <Route path="/Motorista" element={<Motorista />} />
                <Route path="/Van" element={<Van />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;