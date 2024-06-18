import React, { useState, useEffect } from 'react';
import Product from './Product';

interface ProductData {
    id: number;
    name: string;
    description: string;
    price: number;
}

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<ProductData[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedProduct && typeof window !== 'undefined') {
            window.history.pushState({}, '', `/products/${selectedProduct.id}`);
        } else if (typeof window !== 'undefined') {
            window.history.pushState({}, '', '/products');
        }
    }, [selectedProduct]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleProductClick = async (productId: number) => {
        try {
            const response = await fetch(`/api/products/${productId}`);
            const data = await response.json();
            setSelectedProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const handleUpdateProduct = async (updatedProduct: ProductData) => {
        try {
            await fetch(`/api/products/${updatedProduct.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
            setSelectedProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleDeleteProduct = async (productId: number) => {
        try {
            await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
            });
            setSelectedProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button>Add</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                        onProductClick={handleProductClick}
                    />
                ))}
            </div>
            {selectedProduct && (
                <div>
                    <h2>{selectedProduct.name}</h2>
                    <p>{selectedProduct.description}</p>
                    <p>Price: ${selectedProduct.price}</p>
                    <button onClick={() => handleUpdateProduct(selectedProduct)}>
                        Update
                    </button>
                    <button onClick={() => handleDeleteProduct(selectedProduct.id)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;