let express    = require('express');        // call express
let app        = express();                 // define our app using express
// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes
let router = require('./routes');
app.use('/', router);

// **************************************************************************************************
// Session
var session = require('express-session');

app.use(session({
    secret : 'my secret',
    resave : false,
    saveUninitialized : false
})
);
// ***********************************************************************************************************
// Cookie
var cookieParser = require ('cookie-Parser')
app.use(cookieParser())


app.get('/cookie', function(req,res){
    res.cookie("cookie_name", 'my_cookie_value').send('Cookie is set');
});
app.use(cookieParser());

app.get('/coo',(req,res) => {
console.log("Cookies : ", req.cookies);
res.send('Cookie value : ' + req.cookies.cookie_name)
});

app.get('/clearcookie', function(req,res){
    res.clearCookie('cookie_name');
    res.send('Cookie deleted');
});
//************************************************************************************************** */
// Login

let connection = require('./db');

  app.get('/userHome', (req, res) => {    //get function to render userHome.ejs
    res.render('userHome.ejs');
  });
  app.get('/register', (req, res) => {  //get function to render register.ejs
    res.render('register.ejs');
  });

app.post('/auth_login', (req, res) => { //post function to authorize user login
    let email = req.body.email,           //declare email/password variable
        password = req.body.password;
  
    if (email && password) {
      connection.query(
        'SELECT * FROM users.user WHERE email = ? AND password = ?',  //set conn query to mysql
        [email, password],    //insert email and password as data
        (err, results) => {   //function for error throwing and the results
          if (err) throw err;
          if (results.length > 0) {
            console.log(results)
            req.session.userid = results[0].userid;  //set loggedin property as true
            req.session.loggedout = false;  //set loggedout property as false
            req.session.email = email;    //set email property as email itself
            res.redirect('/mainpage');    //redirect to home
          } else {
            res.json({    //json output with error and error code
              code: 400,
              err: 'Incorrect credentials'
            });
          }
          res.end();
        }
      );
    }
  });
      // chek if authorized
    const check = (req, res, next) => {
        if(req.session && req.session.userid >= 0){
            next();
        }
        else{
            res.send('Acces denied');
        }
    };
    // get content endpoint
    app.get('/mainpage', check , function(req, res){
        res.render("mainpage.ejs");
    });



  
  app.post('/auth_register', (req, res) => {  //post function to authorize registration
    let register_data = {   //set register_data variable to have name, email, and password property
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    connection.query('INSERT INTO user SET ?', register_data, (err, results) => {  //set conn query to mysql with err and the results
      if (err) throw err;
      else {
        console.log('Data inserted!', results);  //output to console
        res.redirect('/userHome');  //redirect to login page
      }
    });
  });

//*************************************************************************************************** */


// Launch app to listen to specified port
var port = 8080
app.listen(port, function () { console.log('Running server on port ' + port); })