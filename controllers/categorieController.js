let connection = require('../db');
let catListe = [];
let Categorie = require('../models/categoriesModel')

exports.listeCat1 = function (req,res){
    connection.query("SELECT cat.CatégorieID, ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) { 
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;

            console.log(catListe);
            res.render('categorie1.ejs', {catégorie:catListe});
        }
    });

}
exports.catbtn = function (req,res){
     let catbtn = req.params.CatName;
    connection.query("SELECT cat.CatégorieID, ser.Title as nom, FK_iduser, ser.Description as synopsis, cat.CatName as category, ser.Statut as statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID  where cat.CatName = ? AND ser.FK_iduser = ?;",[catbtn,req.session.userid], function (error, resultSQL) { 
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            catListe =  resultSQL;
            console.log(catListe);
            res.render('categorie1.ejs', {catégorie:catListe});
        }
    });
}
exports.categoriename = function (req,res){
   connection.query("SELECT CatégorieID, CatName as category FROM users.catégorie ;", function (error, resultSQL) { 
       if (error)  {
           res.status(400).send(error);        
       }
       else {
           res.status(200);
           catListe =  resultSQL;
           console.log(catListe);
           res.render('categoriechoice.ejs', {catégorie:catListe});
       }
   });
}
exports.catFormAdd = function(req, res) {
    res.render('catAdd.ejs', {CatégorieID : "", CatName : "" });
}
exports.addcat =  function(req, res) {
    let CatégorieID =  req.query.CatégorieID;
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
exports.updatecat =  function(req, res) {
    let CatégorieID =  req.params.CatégorieID;
    let CatName = req.body.CatName;
    let categ = new Categorie (CatégorieID, CatName);
            console.log(categ);
    
            connection.query("UPDATE catégorie SET ? WHERE CatégorieID= ?", [categ, CatégorieID] , function (error, resultSQL) {
                if(error) {
                    res.status(400).send(error);
                }
                else{
                    res.status(201).redirect('/categoriename');
                }
            });
}
exports.catFormUpdate = function (req, res) {
let CatégorieID = req.params.CatégorieID; // params = barre de recherche
 connection.query("SELECT * from users.catégorie where CatégorieID = ?;", CatégorieID ,function (error, resultSQL) {
    if (error)  {
     res.status(400).send(error);
     }
     else {
        res.status(200);
        catégorie = resultSQL;
        res.render('updatecat.ejs', {CatégorieID:catégorie[0].CatégorieID, CatName:catégorie[0].CatName});
           }
       });
       console.log(catListe); 
}
        
    