let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCat1 = function (req,res){
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID;", function (error, resultSQL) { 
        if (error)  {
            res.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}
exports.catbtn = function (req,res){
    let catbtn = req.params.CatName;
   connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where cat.CatName = ?;",catbtn, function (error, resultSQL) { 
       if (error)  {
           res.status(400).json({'message' : error});    
       }
       else {
           res.status(200);
           catListe =  resultSQL;
           console.log(catListe);
           res.json({catégorie:catListe});
       }
   });
}
exports.categoriename = function (req,res){
    connection.query("SELECT CatName as category FROM users.catégorie ;", function (error, resultSQL) { 
        if (error)  {
            res.status(400).json({'message' : error});         
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });
 }

exports.addcat =  function(req, res) {
    let CatégorieID =  req.body.CatégorieID;
    let CatName = req.body.CatName;
    let categ = new Categorie (CatégorieID, CatName);
        console.log(categ);
        connection.query("INSERT INTO catégorie set ?", categ, function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error}); 
            }
            else{
                res.status(201).json({'message' : 'success'});    
               

             
            }
        });
    }
    