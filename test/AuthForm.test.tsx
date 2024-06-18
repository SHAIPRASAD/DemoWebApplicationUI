// AuthForm.test.tsx
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import AuthForm from '../src/components/AuthForm';

// Mock fetch requests
beforeAll(() => {
    jest.spyOn(window, 'fetch');
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('AuthForm component', () => {
    it('renders login form by default', () => {
        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        expect(usernameInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(loginButton).toBeTruthy();
    });

    it('handles input change correctly', () => {
        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        expect(usernameInput).toBe('testuser');
        expect(passwordInput).toBe('testpassword');
    });

    it('toggles between login and signup forms', () => {
        render(<AuthForm />);

        const toggleButton = screen.getByText('Sign Up');
        fireEvent.click(toggleButton);

        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const typeInput = screen.getByPlaceholderText('Type');
        const emailInput = screen.getByPlaceholderText('Email');

        expect(confirmPasswordInput).toBeTruthy();
        expect(typeInput).toBeTruthy();
        expect(emailInput).toBeTruthy();
    });

    it('submits login form correctly', async () => {
        const mockUsername = 'testuser';
        const mockPassword = 'testpassword';

        (window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: { username: mockUsername } }),
        });

        render(<AuthForm />);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: mockUsername } });
        fireEvent.change(passwordInput, { target: { value: mockPassword } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(window.fetch).toHaveBeenCalledTimes(1);
            expect(window.fetch).toHaveBeenCalledWith('http://localhost:8080/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: mockUsername, password: mockPassword }),
            });
        });

        expect(localStorage.getItem('username')).toBe(mockUsername);
    });

    it('submits signup form correctly', async () => {
        const mockUsername = 'testuser';
        const mockPassword = 'testpassword';
        const mockType = 'admin';
        const mockEmail = 'testuser@example.com';

        (window.fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve({ data: { username: mockUsername } }),
        });

        render(<AuthForm />);

        const toggleButton = screen.getByText('Sign Up');
        fireEvent.click(toggleButton);

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
        const typeInput = screen.getByPlaceholderText('Type');
        const emailInput = screen.getByPlaceholderText('Email');
        const signupButton = screen.getByText('Sign Up');

        fireEvent.change(usernameInput, { target: { value: mockUsername } });
        fireEvent.change(passwordInput, { target: { value: mockPassword } });
        fireEvent.change(confirmPasswordInput, { target: { value: mockPassword } });
        fireEvent.change(typeInput, { target: { value: mockType } });
        fireEvent.change(emailInput, { target: { value: mockEmail } });
        fireEvent.click(signupButton);

        await waitFor(() => {
            expect(window.fetch).toHaveBeenCalledTimes(1);
            expect(window.fetch).toHaveBeenCalledWith('http://localhost:8080/user/sign/up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: mockUsername, password: mockPassword, type: mockType, email: mockEmail }),
            });
        });

        expect(localStorage.getItem('username')).toBe(mockUsername);
    });
});
