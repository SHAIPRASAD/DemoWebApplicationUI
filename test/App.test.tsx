// App.test.tsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../src/components/App';

// Mocking fetch requests
beforeAll(() => {
    jest.spyOn(window, 'fetch');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('App component', () => {
    it('renders Add Product button and ProductList by default', () => {
        render(<App />);

        const addProductButton = screen.getByText('Add Product');
        const productList = screen.getByTestId('product-list'); // Assuming ProductList has data-testid="product-list"

        expect(addProductButton).toBeTruthy();
        expect(productList).toBeTruthy();
    });

    it('shows AddProductForm when Add Product button is clicked', () => {
        render(<App />);

        const addProductButton = screen.getByText('Add Product');
        fireEvent.click(addProductButton);

        const addProductForm = screen.getByTestId('add-product-form'); // Assuming AddProductForm has data-testid="add-product-form"
        expect(addProductForm).toBeTruthy();
    });

    it('adds a new product correctly', async () => {
        const mockProduct = {
            id: 1,
            name: 'Test Product',
            price: 10,
            images: [],
        };

        // Mock fetch response for adding product
        (window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: mockProduct }),
        });

        render(<App />);

        const addProductButton = screen.getByText('Add Product');
        fireEvent.click(addProductButton);

        // Fill out the form fields
        const nameInput = screen.getByPlaceholderText('Name');
        const priceInput = screen.getByPlaceholderText('Price');
        const submitButton = screen.getByText('Add Product');

        fireEvent.change(nameInput, { target: { value: mockProduct.name } });
        fireEvent.change(priceInput, { target: { value: mockProduct.price.toString() } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(window.fetch).toHaveBeenCalledTimes(1);
            expect(window.fetch).toHaveBeenCalledWith('http://localhost:8080/product/add', {
                method: 'POST',
                body: expect.any(FormData),
            });
        });

        // Verify that the product list updates after adding
        const productList = screen.getByTestId('product-list');
        expect(productList).toContain('Test Product'); // Assuming ProductList renders product names
    });

    it('deletes a product correctly', async () => {
        const mockProductId = 1;

        // Mock fetch response for deleting product
        (window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({}),
        });

        render(<App />);

        // Simulate deleting a product
        const deleteButton = screen.getByTestId(`delete-button-${mockProductId}`);
        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(window.fetch).toHaveBeenCalledTimes(1);
            expect(window.fetch).toHaveBeenCalledWith(`http://localhost:8080/product/delete/${mockProductId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });

        // Verify that the product list updates after deleting
        const productList = screen.getByTestId('product-list');
        expect(productList).not.toContain('Test Product'); // Assuming ProductList renders product names
    });
});
