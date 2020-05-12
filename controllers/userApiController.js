let User = require('../models/userModel');
let connection = require('../db');
let userList = [];

exports.userList = function (req, res) {
    connection.query("SELECT * FROM users.user;", function (error, resultSQL) {
        if (error) {
            res.status(400).json({'message' : error});
        }
        else {
            res.status(200);
            userList = resultSQL;
            console.log(userList);
            res.json({user:userList});
        }
    });
}
exports.register = function(req, res) {
    let userid = req.body.userid;
    let name= req.body.name;
    let email= req.body.email;
    let password= req.body.password;
    let user = new User (userid, name, email, password);
   connection.query('INSERT INTO user SET ?', user, (err, results) => {  //set conn query to mysql with err and the results
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
            response.status(400).json({'message' : error});
        }
        else{
            response.json({'message' : 'success'});   
        }
    }); 
    
 };
 exports.updateUser = function (req,res){
    let userid = req.body.userid;
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let user = new User(userid, name, email, password);
        console.log(user);
  
        connection.query("UPDATE `users`.`user` SET ? WHERE userid = ?", [user, req.session.userid] , function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error});
            }
            else{
                res.status(200).json({'message' : 'success'});   
            }
        });
    }