const express=require('express');
const Router =express.Router();
const homeSchema = require('../models/homeSchema');
const bcrypt = require('bcryptjs');

Router.get('/', (err, res) => {
    res.render('register',{title :''})
})

Router.post('/register', async (req, res) => {
    try {
        const {
            username,
            email,
            number,
            password,
            cpassword
        } = req.body;

        if (password === cpassword) {
            const userData = new homeSchema({
                username:username,
                email:email,
                number:number,
                password:password,
                coins:0
            });
            // Save the userData to the database
            try {
                const result = await userData.save();
                console.log(result);
                res.render('register', {
                    title: 'Registered Successfully',
                    password: '',
                    email: ''
                })
            } catch (error) {
               console.log(error) 
            }
            const name = await homeSchema.findOne({username:username});
            if(username===name.username){
                res.render('register', {
                    title: 'Username Already Exist'
                })
            }
            
        } else {
            res.render('register', {
                title: 'Password Doesnt Match'
            })
        }

    } catch (error) {
        console.log(error);
        res.render('register', {
            title: 'Error in code',
            password: '',
            email: ''
        })
    }
})

//signin

Router.post('/login',(req,res)=>{
    
    const{
        username,
        password
    }=req.body;

    homeSchema.findOne({ username: username })
  .then((result) => {
    if (result && password === result.password) {
      console.log("success");
      res.render('index', { name: result.number });
    } else {
      console.log("invalid credentials");
      alert("Invalid Credentials")
      res.redirect('register');
    }
  })
  .catch((err) => {
    console.log(err);
    //res.redirect('../../index.html');
  });

})




module.exports=Router;