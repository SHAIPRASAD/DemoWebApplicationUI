// ProductList.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductList from '../src/components/ProductList';

describe('ProductList component', () => {
    const mockProducts = [
        { id: 1, name: 'Product 1', price: 10, images: [] },
        { id: 2, name: 'Product 2', price: 20, images: [] },
        { id: 3, name: 'Product 3', price: 30, images: [] },
    ];

    const mockOnDeleteProduct = jest.fn();
    const mockOnEditProduct = jest.fn();
    const mockOnEditSubmit = jest.fn();
    const mockOnEditCancel = jest.fn();

    beforeEach(() => {
        render(
            <ProductList
                products={mockProducts}
                onDeleteProduct={mockOnDeleteProduct}
                onEditProduct={mockOnEditProduct}
                editingProduct={null}
                onEditSubmit={mockOnEditSubmit}
                onEditCancel={mockOnEditCancel}
            />
        );
    });

    it('renders no products message when products array is empty', () => {
        render(
            <ProductList
                products={[]}
                onDeleteProduct={mockOnDeleteProduct}
                onEditProduct={mockOnEditProduct}
                editingProduct={null}
                onEditSubmit={mockOnEditSubmit}
                onEditCancel={mockOnEditCancel}
            />
        );

        const noProductsMessage = screen.getByText('No products to list');
        expect(noProductsMessage).toBeTruthy();
    });

    it('renders products correctly with edit and delete buttons', () => {
        const productElements = screen.getAllByRole('listitem');

        expect(productElements).toHaveLength(mockProducts.length);

        productElements.forEach((productElement, index) => {
            const productName = screen.getByText(mockProducts[index].name);
            const productPrice = screen.getByText(`₹${mockProducts[index].price}`);

            expect(productName).toBeTruthy();
            expect(productPrice).toBeTruthy();

            const editButton = screen.getByText('Edit');
            fireEvent.click(editButton);
            expect(mockOnEditProduct).toHaveBeenCalledWith(mockProducts[index]);

            const deleteButton = screen.getByText('Delete');
            fireEvent.click(deleteButton);
            expect(mockOnDeleteProduct).toHaveBeenCalledWith(mockProducts[index].id);
        });
    });

    it('renders EditProductForm when editingProduct is set', () => {
        const editingProduct = mockProducts[0];
        render(
            <ProductList
                products={mockProducts}
                onDeleteProduct={mockOnDeleteProduct}
                onEditProduct={mockOnEditProduct}
                editingProduct={editingProduct}
                onEditSubmit={mockOnEditSubmit}
                onEditCancel={mockOnEditCancel}
            />
        );

        const editProductForm = screen.getByRole('listitem');
        expect(editProductForm).toBeTruthy();
    });
});
