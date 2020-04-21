let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCat1 = function (req,res){
    connection.query("SELECT ser.Title as nom, ser.Description as synopsis, cat.CatName as category, sta.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where FK_CatégorieID = 1;", function (error, resultSQL) { 
        if (error)  {
            response.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}

exports.listeCat2 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, ser.Description as synopsis, cat.CatName as category, sta.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where FK_CatégorieID = 2;", function (error, resultSQL) { 
        if (error)  {
            response.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}
exports.listeCat3 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, ser.Description as synopsis, cat.CatName as category, sta.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where FK_CatégorieID = 3;", function (error, resultSQL) { 
        if (error)  {
            response.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}
exports.listeCat4 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, ser.Description as synopsis, cat.CatName as category, sta.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where FK_CatégorieID = 4;", function (error, resultSQL) { 
        if (error)  {
            response.status(400).json({'message' : error});       
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.json({catégorie:catListe});
        }
    });

}
exports.listeCat5 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, ser.Description as synopsis, cat.CatName as category, sta.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where FK_CatégorieID = 5;", function (error, resultSQL) { 
        if (error)  {
            response.status(400).json({'message' : error});       
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
    