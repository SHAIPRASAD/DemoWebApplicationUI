// ProductItem.tsx
import React from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    images: File[];
}

interface ProductItemProps {
    product: Product;
    onDeleteProduct: (id: number) => void;
    onEditProduct: (product: Product) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
    product,
    onDeleteProduct,
    onEditProduct,
}) => {
    return (
        <li>
            <span>{product.name}</span>
            <span>${product.price}</span>
            <button onClick={() => onEditProduct(product)}>Edit</button>
            <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
        </li>
    );
};

export default ProductItem;