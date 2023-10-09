import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '../App';
import LoginForm from './LoginForm';
import { Provider } from "react-redux";
import { store } from "../store";

const Router: FC = () => {
    return (
        <Provider store={store}>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/login' element={<LoginForm />} />
            </Routes>
        </Provider>
    );
}
export default Router;