let connection = require('../db');
let serieList = [];
let Serie = require('../models/seriesModel')


exports.mainpage = function (req,res){
     console.log(req.session)
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.FK_iduser = ?", req.session.userid, function (error, resultSQL) {
        if (error)  {
            res.status(400).send(error);        
        }
        else {
            res.status(200);
            serieList =  resultSQL;
            console.log(serieList);
            res.render('mainpage.ejs', {series:serieList});
        }
    });
}
exports.Search = function (req,res){
    let champ = req.query.Search;
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where Title = ? ",champ, function (error, resultSQL) {
    serieList =  resultSQL;
    console.log(resultSQL)
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.encours = function (req,res){
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.Statut = 'En cours' AND ser.FK_iduser = ? ;",req.session.userid, function (error, resultSQL) {
    serieList =  resultSQL;
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.Finis = function (req,res){
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.Statut = 'Série Fini'  AND ser.FK_iduser = ?;",req.session.userid, function (error, resultSQL) {
    serieList =  resultSQL;
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.serieFormAdd = function(req, res) {
    res.render('serieAdd.ejs', {SerieID:"",Title:"", Note:"", Description:"",FK_CatégorieID:"", CatName :""});
}
exports.addserie =  function(req, res) {
    let SerieID = req.query.SerieID;
    let Title =  req.body.Title;
    let Note = req.body.Note;
    let Description = req.body.Description;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = "En cours";
    let serie = new Serie(SerieID, Title, Note, Description,FK_CatégorieID, FK_iduser, Statut);
        console.log(serie);
        connection.query("INSERT INTO users.series set ?", serie, function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                console.log(req.session.userid);
                res.status(201).redirect('/mainpage');
            }
        });
    }

 exports.updateseries =  function(req, res) {
    let SerieID = req.body.SerieID;
    let Title =  req.body.Title; // Quand c'est toi qui écrit 
    let Note = req.body.Note;
    let Description = req.body.Description;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = req.body.Statut;
    let serie = new Serie(SerieID, Title, Note, Description,FK_CatégorieID, FK_iduser, Statut);
        console.log(serie);

        connection.query("UPDATE series SET ? WHERE SerieID = ?", [serie, SerieID] , function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                res.status(201).redirect('/mainpage');
            }
        });
    }
// Send user form update
exports.serieFormUpdate = function (request, response) {
    let SerieID = request.params.SerieID; // params = barre de recherche
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, ser.FK_CatégorieID, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.SerieID = ?", SerieID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            series = resultSQL;
            response.render('updateserie.ejs', {SerieID:series[0].SerieID, Title:series[0].Title, Note:series[0].Note, Description:series[0].Description, FK_CatégorieID:series[0].FK_CatégorieID, FK_iduser:series[0].FK_iduser, Statut:series[0].Statut});
        }
    });
    console.log(serieList); 
}
exports.serieRemove = function (request, response) {
    let SerieID = request.params.SerieID;
    console.log(SerieID);
    connection.query( "DELETE from users.series WHERE SerieID = ?" , [SerieID], (error, resultSQL) => {
        if(error) {
            response.status(400).send(error);
        }
        else{
            response.redirect('/mainpage');
        }
    }); 
 };
 exports.serieFormRemove = function (request, response) {
    let SerieID = request.params.SerieID;
    connection.query("Select * from series WHERE SerieID = ?", SerieID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            series = resultSQL;
            response.render('removeserie.ejs', {SerieID:series[0].SerieID, Title:series[0].Title, Note:series[0].Note, Description:series[0].Description, FK_CatégorieID:series[0].FK_CatégorieID});
        }
    });
    console.log(serieList); 
}