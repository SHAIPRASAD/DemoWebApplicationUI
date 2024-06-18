// src/components/Product.tsx
import React from 'react';

interface ProductProps {
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
    };
    onProductClick: (productId: number) => void;
}

const Product: React.FC<ProductProps> = ({ product, onProductClick }) => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                padding: '10px',
                margin: '10px',
                cursor: 'pointer',
            }}
            onClick={() => onProductClick(product.id)}
        >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

export default Product;