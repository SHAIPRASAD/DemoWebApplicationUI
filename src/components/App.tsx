// App.tsx
import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import AddProductForm from './AddProductForm';
import '../styles/App.css';
import '../styles/List.css';

interface Product {
    id: number;
    name: string;
    price: number;
    images: File[];
}

const App: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [localStorageValue, setLocalStorageValue] = useState<string>('');

    useEffect(() => {
        const value = localStorage.getItem('username');
        if (value !== null) {
            setLocalStorageValue(value); // Update state only if value is not null
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:8080/product/get/all', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Product Fetch failed');
            }

            const data = await response.json();
            setProducts(data.data);
            console.log('Product Fetch successful:', data);
            setShowAddForm(false);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(' Product Fetch error:', error.message);
            }
            else {
                console.error('Unknown error occurred:', error);
            }
        }
    };

    const handleAddProduct = async (product: Product) => {
        try {

            const formData = new FormData();
            formData.append('name', product.name);
            formData.append('price', product.price.toString());
            formData.append('seller', localStorageValue);
            product.images.forEach((image) => {
                formData.append('files', image);
            })
            const response = await fetch('http://localhost:8080/product/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Product Add failed');
            }

            const data = await response.json();
            await fetchProducts();
            console.log('Product Add successful:', data);
            setShowAddForm(false);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error('Product add error:', error.message);
            }
            else {
                console.error('Unknown error occurred:', error);
            }
        }
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            const response = await fetch('http://localhost:8080/product/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Product Delete failed');
            }

            const data = await response.json();
            await fetchProducts();
            console.log('Product Delete successful:', data);

        } catch (error) {
            if (error instanceof Error) {
                console.error('Product Delete error:', error.message);
            }
            else {
                console.error('Unknown error occurred:', error);
            }
        }


    };

    const handleEditProduct = async (updatedProduct: Product) => {
        setProducts(
            products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );

        try {
            const response = await fetch('http://localhost:8080/product/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ updatedProduct }),
            });

            if (!response.ok) {
                throw new Error('Product Edit failed');
            }

            const data = await response.json();
            console.log('Product DelEditete successful:', data);

        } catch (error) {
            if (error instanceof Error) {
                console.error('Product Edit error:', error.message);
            }
            else {
                console.error('Unknown error occurred:', error);
            }
        }

        setEditingProduct(null);
    };

    const handleStartEditProduct = (product: Product) => {
        setEditingProduct(product);
    };

    const handleCancelEditProduct = () => {
        setEditingProduct(null);
    };

    return (
        <div>
            <button onClick={() => setShowAddForm(true)}>Add Product</button>
            {showAddForm ? (
                <AddProductForm onAddProduct={handleAddProduct} />
            ) : (
                <ProductList
                    products={products}
                    onDeleteProduct={handleDeleteProduct}
                    onEditProduct={handleStartEditProduct}
                    editingProduct={editingProduct}
                    onEditSubmit={handleEditProduct}
                    onEditCancel={handleCancelEditProduct}
                />
            )}
        </div>
    );
};

export default App;