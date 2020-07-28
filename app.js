//EXPRESS
const express = require('express');
const app = express();

//STRIPE
const stripe = require('stripe')('sk_test_51H9ruvHU92bzx634kG9032mDoZwlxnSIdRlKTk04bFxOFhvrQ7vq9UoYFgT21W2psvoCxdTvQMU7Wmjs3xSnbmr50005dqcKXp');

//BODY-PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//EXPRESS HANDLEBARS and MIDDLEWARE
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

//Set Static Folder
app.use(express.static(`${__dirname}/public`));

//INDEX ROUTE
app.get('/', (req, res)=>{
    res.render('index');
})

//CHARGE ROUTE
app.post('/charge', (req, res)=>{
    const amount = 25000;
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
    })
    .then(customer => stripe.charges.create({
        amount:amount, //In es6 you can jus leave it as amount,
        description: 'Ryzen Processor',
        currency: 'usd',
        customer: customer.id,
    }))
    .then(charge => res.render('Success'));
})


//SERVER
const PORT = process.env.PORT || 5550;
app.listen(PORT, ()=>{
    console.log(`Server started on PORT ${PORT}`);
})