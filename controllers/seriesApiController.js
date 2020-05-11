let connection = require('../db');
let serieList = [];
let Serie = require('../models/seriesModel')


exports.mainpage = function (req,res){
     console.log(req.session)
    connection.query("SELECT ser.FK_CatégorieID, ser.SerieID, ser.FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID ", function (error, resultSQL) {
        if (error)  {
            res.status(400).json({'message' : error});        
        }
        else {
            res.status(200);
            serieList =  resultSQL;
            console.log(serieList);
            res.json({series:serieList});
        }
    });
}
exports.Search = function (req,res){
    let champ = req.params.Title;
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where Title = ?;", champ, function (error, resultSQL) {
    serieList =  resultSQL;
    console.log(resultSQL)
    res.json({series:serieList});
    });
}
exports.encours = function (req,res){
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.Statut = 'En cours';", function (error, resultSQL) {
    serieList =  resultSQL;
    res.json({series:serieList});
    });
}
exports.Finis = function (req,res){
    connection.query("SELECT ser.SerieID, FK_iduser, ser.Title , ser.Description , ser.Note , ser.Statut, cat.CatName FROM users.series ser inner join users.catégorie cat on ser.FK_catégorieID = cat.CatégorieID where ser.Statut = 'Série Fini';", function (error, resultSQL) {
    serieList =  resultSQL;
    res.json({series:serieList});
    });
}
exports.addserie =  function(req, res) {
    let SerieID = req.body.SerieID;
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
                res.status(400).json({'message' : error});    
            }
            else{
                res.status(200).json({'message' : 'success'});    
            }
        });
    }

 exports.updateseries =  function(req, res) {
    let SerieID = req.body.SerieID;
    let Title =  req.body.Title;
    let Note = req.body.Note;
    let Description = req.body.Description;
    let FK_CatégorieID = req.body.FK_CatégorieID;
    let FK_iduser = req.session.userid;
    let Statut = req.body.Statut;
    let serie = new Serie(SerieID, Title, Note, Description,FK_CatégorieID, FK_iduser, Statut);
        console.log(serie);

        connection.query("UPDATE series SET ? WHERE SerieID = ?", [serie, req.params.SerieID] , function (error, resultSQL) {
            if(error) {
                res.status(400).json({'message' : error});  
            }
            else{
                res.status(200).json({'message' : 'success'});   
            }
        });
    }
exports.serieRemove = function (request, response) {
    let SerieID = request.params.SerieID;
    console.log(SerieID);
    connection.query( "DELETE from users.series WHERE SerieID = ?" , [SerieID], (error, resultSQL) => {
        if(error) {
            response.status(400).json({'message' : error}); 
        }
        else{
            response.json({'message' : 'success'});   
        }
    }); 
 };
