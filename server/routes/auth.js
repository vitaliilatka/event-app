// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Регистрация пользователя
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Проверка на существование пользователя
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully' });
});

// Логин пользователя
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ user });
});

module.exports = router;









// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const config = require('../config');

// // Регистрация пользователя
// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         let user = await User.findOne({ username });
//         if (user) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         user = new User({
//             username,
//             email,
//             password
//         });

//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(password, salt);

//         await user.save();

//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(
//             payload,
//             config.secret_key,
//             { expiresIn: 360000 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.status(201).json({ token });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// // Авторизация пользователя
// router.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         let user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }

//         const payload = {
//             user: {
//                 id: user.id
//             }
//         };

//         jwt.sign(
//             payload,
//             config.secret_key,
//             { expiresIn: 360000 },
//             (err, token) => {
//                 if (err) throw err;
//                 res.json({ token, user });
//             }
//         );
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server error');
//     }
// });

// module.exports = router;
