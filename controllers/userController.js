let User = require('../models/userModel');
let connection = require('../db');

exports.home = function(req, res) {
    res.render('userHome.ejs');
  };
exports.login = function (req,res){
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
};

// Send form to update user
exports.userFormUpdate = function(request, response) {
    response.render('register.ejs');
}
exports.register = function(req, res) {
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
    };


exports.userRemove = function (request, response) {
    let sql = "DELETE FROM `users`.`user` WHERE userid = ?";
    connection.query( sql , [request.session.userid], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/userHome');
        }
    }); 
    
 };
 exports.confirm = function (req,res){
    res.render('confirm.ejs');
 }

