import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        axios.post('http://localhost:3030/api/auth/login', {email, password
        }).then(resp =>{
            console.log('Login successful:', resp.data);
            if(resp.data.message === 'success'){
                navigate('/home');
            }
        }).catch(err => {
            console.error('There was an error logging in!', err);
        });

    }
    return (<>

        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <h2 class="card-title text-center mb-4">Login</h2>
                            <form>
                                <div class="mb-3">
                                    <label for="inputEmail" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="inputEmail" name="email" placeholder="name@example.com" required onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div class="mb-3">
                                    <label for="inputPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="inputPassword" name="password" required onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary" onClick={handleLogin}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>)

}
export default Login;