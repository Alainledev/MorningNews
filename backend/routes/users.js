var express = require('express');
var router = express.Router();

const fetch = require('node-fetch');
const User = require('../models/users');

router.post('/signup', (req,res) => {
    const username = req.body.username ;
    const password = req.body.password ;

    if (!username || !password) {
        res.json({ result: false, error : 'Missing or empty fields' });
    } else {
        User.findOne({ username: username , password : password}).then(data => {
            if (data) {    
                res.json({ result: false, error: 'User already exists'})
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password
                })
                newUser.save()
                res.json({ result: true })
            }
        })
    }
})

router.post('/signin', (req,res) => {
    const username = req.body.username ;
    const password = req.body.password ;

    if (!username || !password) {
        res.json({ result: false, error : 'Missing or empty fields' });
    } else {
        User.findOne({username : username }).then(data => {
            if (!data) {    
                res.json({ result: false, error: 'User not found'})
            } else {
                res.json({ result: true })
            }
        })
    }
})


module.exports = router;






