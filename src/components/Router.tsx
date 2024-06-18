import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthForm from './AuthForm';
import Product from './Product';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/products" element={<Product product={{
                    id: 0,
                    name: '',
                    description: '',
                    price: 0
                }} onProductClick={function (productId: number): void {
                    throw new Error('Function not implemented.');
                }} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;