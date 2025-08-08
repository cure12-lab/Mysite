const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/step1', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.json({ exists: !!user });
});

router.post('/step2', async (req, res) => {
    const { email, password, isNew } = req.body;
    let user;
    if(isNew === 'true') {
        user = new User({ email, password, purchases: [] });
        await user.save();
    } else {
        user = await User.findOne({ email });
        if(!user || user.password !== password) {
            return res.json({ success: false, message: 'Wrong password' });
        }
    }
    req.session.user = user;
    res.json({ success: true });
});

module.exports = router;
