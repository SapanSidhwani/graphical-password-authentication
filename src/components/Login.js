import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import { useNavigate } from "react-router-dom";

const Login = ({ showAlert }) => {

    let navigate = useNavigate();
    const [passwordCred, setPasswordCred] = useState([]);
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (credentials.email.trim().length === 0 || passwordCred.length === 0) {
            showAlert('Please enter all values before proceeding', 'warning');
        }
        else {

            passwordCred.sort((a, b) => {
                return Number(a) - Number(b);
            });
            credentials.password = passwordCred.join(' ');

            const response = await fetch(`${process.env.REACT_APP_FETCH}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem('token', json.authToken)
                showAlert("Logged in Successfully", "success");
                navigate('/');
            }
            else {
                showAlert("Invalid Details", "danger");
            }
        }
    }

    const onChangeFunc = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="mt-2">
            <h2 className="mb-4 text-center">Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" autocomplete="off" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChangeFunc} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <CategorySelector password={passwordCred} setPassword={setPasswordCred} />
                <button type="submit" style={{ marginTop: '15px' }} className="mx-auto d-flex btn btn-primary mb-3">Submit</button>
            </form>
        </div>
    )
}

export default Login
