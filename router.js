var express = require("express");
var router = express.Router();


const credential = {
    email:"admin@gmail.com",
    password:"admin@123"
}


// login user
router.post('/login',(req,res) => {
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');

        // res.end('Login Successful...!')
    }else if(req.body.email != credential.email || req.body.password != credential.password){
        
        res.render('base',{title:"Express",invalid:"Invalid Credentials"});
    }else{
        res.redirect('/')
    }
})

router.get('/login',(req,res)=>{
    if(req.session.user){
        res.send('dashboard',{user:req.session.user})
    }
})


// route for dashboard

router.get('/dashboard',(req,res) =>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user})
        
    }
})

// route for logout

router.get('/logout',(req,res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else{
            res.render('base',{title:"Express",logout:"Logout Successfull!!!"})
            
        }
    })
})

module.exports = router;

// router.get((req,res => {
//     req.body.num1
//     req.num2
//     let sum = req.num1 + req.num2
//     res.render(sum)
// }))
