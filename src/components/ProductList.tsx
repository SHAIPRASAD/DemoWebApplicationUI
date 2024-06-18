// ProductList.tsx
import React from 'react';
import ProductItem from './ProductItem';
import EditProductForm from './EditProductForm';

interface Product {
    id: number;
    name: string;
    price: number;
    images: File[];
}

interface ProductListProps {
    products: Product[];
    onDeleteProduct: (id: number) => void;
    onEditProduct: (product: Product) => void;
    editingProduct: Product | null;
    onEditSubmit: (updatedProduct: Product) => void;
    onEditCancel: () => void;
}

const ProductList: React.FC<ProductListProps> = ({
    products,
    onDeleteProduct,
    onEditProduct,
    editingProduct,
    onEditSubmit,
    onEditCancel,
}) => {
    return (
        <div>
            {products.length === 0 ? (
                <div>No products to list</div>
            ) : (
                <ul>
                    {products.map((product) =>
                        editingProduct && editingProduct.id === product.id ? (
                            <EditProductForm
                                key={product.id}
                                product={editingProduct}
                                onSubmit={onEditSubmit}
                                onCancel={onEditCancel}
                            />
                        ) : (

                            <div key={product.id} className="product-card">
                                <div className="product-image">
                                    {/* <img src={product.images[0]} alt={product.name} /> */}
                                </div>
                                <div className="product-details">
                                    <h3 className="product-name">{product.name}</h3>
                                    <p className="product-price">₹{product.price}</p>
                                    <div className="product-actions">
                                        <button onClick={() => onEditProduct(product)}>Edit</button>
                                        <button onClick={() => onDeleteProduct(product.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </ul>
            )}
        </div>
    );
};

export default ProductList;