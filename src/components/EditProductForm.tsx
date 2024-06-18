// EditProductForm.tsx
import React, { useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    images: File[];
}

interface EditProductFormProps {
    product: Product;
    onSubmit: (updatedProduct: Product) => void;
    onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({
    product,
    onSubmit,
    onCancel,
}) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [images, setImages] = useState<File[]>(product.images);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ ...product, name, price, images });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    return (
        <li>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
                <input type="file" multiple onChange={handleImageChange} />
                <button type="submit">Save</button>
                <button onClick={onCancel}>Cancel</button>
            </form>
        </li>
    );
};

export default EditProductForm;