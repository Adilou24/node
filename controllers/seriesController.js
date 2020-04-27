let connection = require('../db');
let serieList = [];
let Serie = require('../models/seriesModel')


exports.mainpage = function (req,res){
     console.log(req.session)
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , cat.CatName , sta.Statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where ser.FK_iduser = ?", req.session.userid, function (error, resultSQL) {
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
    connection.query("SELECT ser.SerieID, ser.Title , ser.Description , ser.Note, cat.CatName , sta.Statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where Title = ?;", champ, function (error, resultSQL) {
    serieList =  resultSQL;
    console.log(resultSQL)
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.encours = function (req,res){
    connection.query("SELECT ser.SerieID, ser.Title , ser.Description, ser.Note , cat.CatName , sta.Statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where sta.Statut = 'En cours';", function (error, resultSQL) {
    serieList =  resultSQL;
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.Finis = function (req,res){
    connection.query("SELECT ser.SerieID, ser.Title, ser.Description , ser.Note , cat.CatName , sta.Statut FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID inner join users.statut sta on ser.SerieID = sta.SerieID where sta.Statut = 'Série Fini';", function (error, resultSQL) {
    serieList =  resultSQL;
    res.render('mainpage.ejs', {series:serieList});
    });
}
exports.serieFormAdd = function(req, res) {
    res.render('serieAdd.ejs', {Title:"", Note:"", Description:"",FK_CatégorieID:"", CatName :"", FK_iduser:req.session.userid});
}
exports.addserie =  function(req, res) {
    let SerieID = req.body.SerieID;
    let Title =  req.body.Title;
    let Note = req.body.Note;
    let Description = req.body.Description;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let CatName = req.body.CatName;
    let FK_iduser = req.session.userid;
    let serie = new Serie(SerieID, Title, Note, Description,FK_CatégorieID, CatName, FK_iduser);
        console.log(serie);
        connection.query("INSERT INTO users.series set ?", serie, function (error, resultSQL) {
            if(error) {
                res.status(400).send(error);
            }
            else{
                res.status(201).redirect('/mainpage');
            }
        });
    }

 exports.updateseries =  function(req, res) {
    let SerieID = req.body.SerieID;
    let Title =  req.body.Title;
    let Note = req.body.Note;
    let Description = req.body.Description;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let serie = new Serie(SerieID, Title, Note, Description,FK_CatégorieID);
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
    let SerieID = request.params.SerieID;
    connection.query("Select * from series WHERE SerieID = ?", SerieID ,function (error, resultSQL) {
        if (error)  {
            response.status(400).send(error);
        }
        else {
            response.status(200);
            series = resultSQL;
            response.render('updateserie.ejs', {SerieID:series[0].SerieID, Title:series[0].Title, Note:series[0].Note, Description:series[0].Description, FK_CatégorieID:series[0].FK_CatégorieID});
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