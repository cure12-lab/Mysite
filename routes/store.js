const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();

router.use(async (req, res, next) => {
    const count = await Product.countDocuments();
    if(count === 0) {
        await Product.insertMany([
            { name: 'Pirate King Skin', price: 100, image: 'https://clash-assets.com/images/pirate-king.png' },
            { name: 'Jungle Warden Skin', price: 120, image: 'https://clash-assets.com/images/jungle-warden.png' },
            { name: 'Shadow Queen Skin', price: 150, image: 'https://clash-assets.com/images/shadow-queen.png' },
            { name: 'Pirate Scenery', price: 200, image: 'https://clash-assets.com/images/pirate-scenery.png' },
            { name: 'Jungle Scenery', price: 220, image: 'https://clash-assets.com/images/jungle-scenery.png' },
            { name: 'Shadow Scenery', price: 250, image: 'https://clash-assets.com/images/shadow-scenery.png' }
        ]);
        console.log("✅ Products seeded");
    }
    next();
});

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.render('pages/store', { title: 'Clash Event', user: req.session.user, products });
});

router.post('/buy/:id', async (req, res) => {
    if(!req.session.user) return res.json({ loginRequired: true });
    const product = await Product.findById(req.params.id);
    if(product) {
        const user = await User.findById(req.session.user._id);
        user.purchases.push(product.name);
        await user.save();
        req.session.user = user;
        return res.json({ success: true, redirect: `/success/${product._id}` });
    }
    res.json({ success: false });
});

router.get('/success/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) return res.redirect('/');
    res.render('pages/success', { title: 'Success', product });
});

module.exports = router;
