let express    = require('express');        // call express
let app        = express();                 // define our app using express
// Configure bodyparser to handle POST requests
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.use(cookieParser());

//************************************************************************************************** */
// Login
// app.post('/auth_login', (req, res) => { //post function to authorize user login
  //   let email = req.body.email,           //declare email/password variable
  //       password = req.body.password;
  
  //   if (email && password) {
  //     connection.query(
  //       'SELECT * FROM users.user WHERE email = ? AND password = ?',  //set conn query to mysql
  //       [email, password],    //insert email and password as data
  //       (err, results) => {   //function for error throwing and the results
  //         if (err) throw err;
  //         if (results.length > 0) {
  //           console.log(results)
  //           req.session.userid = results[0].userid;  //set loggedin property as true
  //           req.session.email = email;    //set email property as email itself
  //           res.redirect('/mainpage');    //redirect to home
  //         } else {
  //           res.json({    //json output with error and error code
  //             code: 400,
  //             err: 'Incorrect credentials'
  //           });
  //         }
  //         res.end();
  //       }
  //     );
  //   }
  // });

//*************************************************************************************************** */
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrictitto the requireddomain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if(req.method== 'OPTIONS') {res.status(200).end();
  } 
  else { next(); }
});

//**************************************************************************************************** */
// Import routes
let router = require('./routes');
app.use('/', router);

// Launch app to listen to specified port
var port = 8000
app.listen(port, function () { console.log('Running server on port ' + port); })