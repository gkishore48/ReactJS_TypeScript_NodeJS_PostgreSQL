import React,{FC} from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import LoginForm from './LoginForm';

const Router:FC = () => {
return (  
        <Routes>
            <Route path='/' element={<App/>} />
            <Route path='/login' element={<LoginForm/>} />
        </Routes>
);
}
export default Router;