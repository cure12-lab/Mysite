const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.session.admin) return res.redirect('/admin/dashboard');
    res.render('pages/admin-login', { title: 'Admin Login', error: null });
});

router.post('/', (req, res) => {
    const { password } = req.body;
    if(password === process.env.ADMIN_PASS) {
        req.session.admin = true;
        return res.redirect('/admin/dashboard');
    }
    res.render('pages/admin-login', { title: 'Admin Login', error: 'Invalid password' });
});

router.get('/dashboard', async (req, res) => {
    if(!req.session.admin) return res.redirect('/admin');
    const users = await User.find();
    res.render('pages/admin', { title: 'Admin Dashboard', users });
});

module.exports = router;
