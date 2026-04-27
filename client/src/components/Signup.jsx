import react, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);
        axios.post('http://localhost:3030/api/auth/register', {
            username,
            email,
            password
        })
        .then(response => {
            console.log('Registration successful:', response.data);
            navigate('/login');
        })
        .catch(error => {
            console.error('There was an error registering!', error);
        });
    }

    return(
        <>
        <div class="container mt-5">
            <div class="row justify-content-center">
                <div class="col-md-6 col-lg-4">
                    <div class="card shadow">
                        <div class="card-body">
                            <h2 class="card-title text-center mb-4">Sign Up</h2>
                            <form>
                                
                                <div class="mb-3">
                                    <label for="inputUsername" class="form-label">Username</label>
                                    <input type="text" class="form-control" id="inputUsername" name="username" placeholder="Choose a username" required onChange={(e) => {setUsername(e.target.value)}} />
                                </div>
                                
                                <div class="mb-3">
                                    <label for="inputEmail" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="inputEmail" name="email" placeholder="name@example.com" required onChange={(e) => {setEmail(e.target.value)}} />
                                </div>
                                
                                <div class="mb-3">
                                    <label for="inputPassword" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="inputPassword" name="password" required onChange={(e) => {setPassword(e.target.value)}} />
                                </div>
                                
                                {/* <div class="mb-3">
                                    <label for="inputConfirmPassword" class="form-label">Repeat Password</label>
                                    <input type="password" class="form-control" id="inputConfirmPassword" required /> 
                                </div> */}
                               
                                {/* <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="termsCheck" required />
                                    <label class="form-check-label" for="termsCheck">I agree to the terms and conditions</label>
                                </div> */}
                                
                                <div class="d-grid gap-2">
                                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Sign Up</button>
                                </div>
                            </form>
                            <p class="text-center mt-3 mb-0">
                                Already have an account? <Link to="/login">Login now</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    

        </>
    )
}

export default Signup;
