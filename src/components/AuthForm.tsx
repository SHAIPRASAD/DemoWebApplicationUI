import React, { useState } from 'react';
import '../styles/LoginForm.css';

type AuthMode = 'login' | 'signup';

export default function AuthForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [mode, setMode] = useState<AuthMode>('login');
    // const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (mode === 'login') {
            try {
                const response = await fetch('http://localhost:8080/authenticate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ "username": username, "password": password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                console.log('Login successful:', data);

                // Store username in localStorage
                localStorage.setItem('username', username);

                // navigate('/products');


                // Handle success, e.g., redirect user
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Login error:', error.message);
                }
                else {
                    console.error('Unknown error occurred:', error);
                }
            }
        } else {
            if (password !== confirmPassword) {
                console.log('Passwords do not match');
            } else {
                try {
                    const response = await fetch('http://localhost:8080/user/sign/up', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ "username": username, "password": password, "type": type, "email": email }),
                    });

                    if (!response.ok) {
                        throw new Error('Signup failed');
                    }

                    const data = await response.json();
                    console.log('Signup successful:', data);

                    // Store username in localStorage
                    localStorage.setItem('username', username);

                    // Handle success, e.g., show success message to user
                } catch (error) {
                    if (error instanceof Error) {
                        console.error('Signup error:', error.message);
                        // Handle specific error types, e.g., show error message to user
                    } else {
                        console.error('Unknown error occurred:', error);
                        // Handle other types of errors, if needed
                    }
                }
            }
        }
    };

    const toggleMode = () => {
        setMode(mode === 'login' ? 'signup' : 'login');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {mode === 'signup' && (
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            )}
            {mode === 'signup' && (
                <input
                    type="username"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
            )}
            {mode === 'signup' && (
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            )}
            <button type="submit">{mode === 'login' ? 'Login' : 'Sign Up'}</button>
            <button type="button" onClick={toggleMode}>
                {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
        </form>
    );
}