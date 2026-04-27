
const express = require('express');
const router = express.Router();
const Employee = require('../model/Employee');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async(req, res) => {
    const { username, email, password } = req.body;
    console.log('Received registration data:', { username, email, password });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let user = await Employee.create({ name: username, email, password: hashedPassword })
    if(!user){
        console.error('Error saving user to database:', err);
            res.status(500).json({ message: 'Error registering user' });
    }
    console.log('User saved to database:', user);
    res.status(200).json({ message: 'User registered successfully', user: { username, email } });
});

router.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    console.log('Received login data:', { email, password });
    try{
    const user = await Employee.findOne({ email });
        if(!user){
            console.log('No user found with provided email');
            return res.status(401).json({ message: 'Invalid email' });
        }
    const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            console.log('Password does not match for user:', user);
            return res.status(401).json({ message: 'Invalid password' });
        }
    const token = jwt.sign({userId : user._id}, 'my_secret_key', { expiresIn: '1h' });
        res.status(200).json({ message: 'success', user: { email: user.email }, token });
      
    }catch(err){
        console.error('Unexpected error during login:', err);
        res.status(500).json({ message: 'Unexpected error logging in' });
    }
});

module.exports = router;