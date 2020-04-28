let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCat1 = function (req,res){
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where FK_CatégorieID = 1 AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.render('categorie1.ejs', {catégorie:catListe});
        }
    });

}

exports.listeCat2 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where FK_CatégorieID = 2 AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categorie2.ejs', {catégorie:catListe});
        }
    });
}
exports.listeCat3 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where FK_CatégorieID = 3 AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categorie3.ejs', {catégorie:catListe});
        }
    });
}
exports.listeCat4 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where FK_CatégorieID = 4 AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categorie4.ejs', {catégorie:catListe});
        }
    });
}
exports.listeCat5 = function (req,res){
     
    connection.query("SELECT ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where FK_CatégorieID = 5 AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            response.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categorie5.ejs', {catégorie:catListe});
        }
    });
}

exports.catFormAdd = function(req, res) {
    res.render('catAdd.ejs', {CatégorieID : "", CatName : "" });
}
exports.addcat =  function(req, res) {
    let CatégorieID =  req.body.CatégorieID;
    let CatName = req.body.CatName;
    let categ = new Categorie (CatégorieID, CatName);
        console.log(categ);
        connection.query("INSERT INTO catégorie set ?", categ, function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                res.status(201).redirect('/categorie1');
               

             
            }
        });
    }
    