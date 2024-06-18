// AddProductForm.tsx
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    images: File[];
}

interface AddProductFormProps {
    onAddProduct: (product: Product) => void;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [images, setImages] = useState<File[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProduct({
            name, price, images,
            id: 0
        });
        setName('');
        setPrice(0);
        setImages([]);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                placeholder="Price"
            />
            <input type="file" multiple onChange={handleImageChange} />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;