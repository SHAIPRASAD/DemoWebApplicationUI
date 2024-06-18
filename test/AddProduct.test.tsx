// AddProductForm.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddProductForm from '../src/components/AddProductForm';

// Mock function for onAddProduct
const mockOnAddProduct = jest.fn();

describe('AddProductForm component', () => {
    beforeEach(() => {
        // Reset the mock function before each test
        mockOnAddProduct.mockClear();
    });

    it('renders form inputs correctly', () => {
        render(<AddProductForm onAddProduct={mockOnAddProduct} />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText('Price') as HTMLInputElement;
        const fileInput = screen.getByLabelText('Upload Images') as HTMLInputElement;
        const submitButton = screen.getByText('Add Product') as HTMLButtonElement;

        expect(nameInput).toBeTruthy();
        expect(priceInput).toBeTruthy();
        expect(fileInput).toBeTruthy();
        expect(submitButton).toBeTruthy();
    });

    it('handles input changes correctly', () => {
        render(<AddProductForm onAddProduct={mockOnAddProduct} />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText('Price') as HTMLInputElement;

        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '10' } });

        expect(nameInput.value).toBe('Test Product');
        expect(priceInput.value).toBe('10');
    });

    it('adds images correctly', () => {
        render(<AddProductForm onAddProduct={mockOnAddProduct} />);

        const fileInput = screen.getByLabelText('Upload Images') as HTMLInputElement;

        const file1 = new File(['file1 contents'], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File(['file2 contents'], 'file2.png', { type: 'image/png' });

        fireEvent.change(fileInput, {
            target: { files: [file1, file2] },
        });

        expect(fileInput.files).toHaveLength(2);
        expect(fileInput.files![0].name).toBe('file1.jpg');
        expect(fileInput.files![1].name).toBe('file2.png');
    });

    it('submits form with correct product data', () => {
        render(<AddProductForm onAddProduct={mockOnAddProduct} />);

        const nameInput = screen.getByPlaceholderText('Name') as HTMLInputElement;
        const priceInput = screen.getByPlaceholderText('Price') as HTMLInputElement;
        const fileInput = screen.getByLabelText('Upload Images') as HTMLInputElement;
        const submitButton = screen.getByText('Add Product') as HTMLButtonElement;

        fireEvent.change(nameInput, { target: { value: 'Test Product' } });
        fireEvent.change(priceInput, { target: { value: '10' } });

        const file1 = new File(['file1 contents'], 'file1.jpg', { type: 'image/jpeg' });
        const file2 = new File(['file2 contents'], 'file2.png', { type: 'image/png' });

        fireEvent.change(fileInput, {
            target: { files: [file1, file2] },
        });

        fireEvent.click(submitButton);

        expect(mockOnAddProduct).toHaveBeenCalledTimes(1);
        expect(mockOnAddProduct).toHaveBeenCalledWith({
            id: 0,
            name: 'Test Product',
            price: 10,
            images: [file1, file2],
        });
    });
});
