import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import CategorySelector from './CategorySelector';

const SignUp = ({ showAlert }) => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '' });
    const [passwordCred, setPasswordCred] = useState([]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        let { name, email, password } = credentials;

        if (passwordCred.length <= 4) {

            showAlert("Select atleast 5 images", "warning");
        }
        else if (name.trim().length === 0 || email.trim().length === 0) {
            showAlert('Please enter all values before proceeding', 'warning');
        }
        else {

            passwordCred.sort((a, b) => {
                return Number(a) - Number(b);
            });
            password = passwordCred.join(' ');

            const response = await fetch(`${process.env.REACT_APP_HOST}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            const json = await response.json();
            if (json.success) {

                localStorage.setItem('token', json.authToken);
                showAlert("Account Created Successfully", "success");
                navigate('/');
            }
            else {
                showAlert("Sorry email already exists", "warning");
            }
            setPasswordCred([]);
        }
    }
    return (

        <div className="mt-2">
            <h2 className="mb-4 text-center">Create an account to use an iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input className="form-control" autocomplete="off" name="name" id="name" value={credentials.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" value={credentials.email} aria-describedby="emailHelp" autocomplete="off" onChange={handleChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                {/* Provides you an images of selected category */}
                <CategorySelector password={passwordCred} setPassword={setPasswordCred} />

                <button type="submit" style={{ marginTop: '15px' }} className="mx-auto d-flex btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
