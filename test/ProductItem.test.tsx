// ProductItem.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProductItem from '../src/components/ProductItem';

describe('ProductItem component', () => {
    const mockProduct = {
        id: 1,
        name: 'Test Product',
        price: 20.5,
        images: [],
    };

    const mockOnEditProduct = jest.fn();
    const mockOnDeleteProduct = jest.fn();

    beforeEach(() => {
        render(
            <ProductItem
                product={mockProduct}
                onEditProduct={mockOnEditProduct}
                onDeleteProduct={mockOnDeleteProduct}
            />
        );
    });

    it('renders product name and price', () => {
        const nameElement = screen.getByText('Test Product');
        const priceElement = screen.getByText('$20.5');

        expect(nameElement).toBeTruthy();
        expect(priceElement).toBeTruthy();
    });

    it('calls onEditProduct with correct product when Edit button is clicked', () => {
        const editButton = screen.getByText('Edit');
        fireEvent.click(editButton);

        expect(mockOnEditProduct).toHaveBeenCalledWith(mockProduct);
    });

    it('calls onDeleteProduct with correct ID when Delete button is clicked', () => {
        const deleteButton = screen.getByText('Delete');
        fireEvent.click(deleteButton);

        expect(mockOnDeleteProduct).toHaveBeenCalledWith(mockProduct.id);
    });
});
