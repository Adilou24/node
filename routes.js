// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              
// controller
var userController = require('./controllers/userController');
var seriesController = require('./controllers/seriesController');
var seriesApiController = require('./controllers/seriesApiController');
var categorieController = require('./controllers/categorieController');
var categorieApiController = require('./controllers/categorieApiController')

const check = (req, res, next) => {
    if(req.session && req.session.userid >= 0){
        next();
    }
    else{
        res.send('Acces denied');
    }
};

router.get('/', (request, response) => response.redirect('/userHome'));
// Route SERIE
// router.get('/user', userController.userHome);
router.get('/mainpage',check, seriesController.mainpage);
router.get('/addserie', seriesController.serieFormAdd);
router.post('/newserie', seriesController.addserie);
router.get('/updateformserie/:SerieID', seriesController.serieFormUpdate);
router.post ('/updateserie', seriesController.updateseries);
router.get('/deleteformserie/:SerieID', seriesController.serieFormRemove);
router.post('/deleteserie/:SerieID', seriesController.serieRemove);
router.get('/Search', seriesController.Search);
router.get('/EnCours', seriesController.encours);
router.get('/Finis', seriesController.Finis);

// Route API SERIE
router.get('/Api/mainpage', seriesApiController.mainpage);
router.get('/Api/Search/:Title', seriesApiController.Search);
router.get('/Api/EnCours', seriesApiController.encours);
router.get('/Api/Finis', seriesApiController.Finis);
router.post('/Api/newserie', seriesApiController.addserie);
router.put('/Api/updateserie/:SerieID', seriesApiController.updateseries);
router.delete('/Api/deleteserie/:SerieID', seriesApiController.serieRemove);

// Route CATEGORIE
router.get('/categorie1', categorieController.listeCat1);
router.get('/categorie2', categorieController.listeCat2);
router.get('/categorie3', categorieController.listeCat3);
router.get('/categorie4', categorieController.listeCat4);
router.get('/categorie5', categorieController.listeCat5);
router.get('/addcategorie', categorieController.catFormAdd);
router.post('/newcat', categorieController.addcat);

// Route API CATEGORIE
router.get('/Api/categorie1', categorieApiController.listeCat1);
router.get('/Api/categorie2', categorieApiController.listeCat2);
router.get('/Api/categorie3', categorieApiController.listeCat3);
router.get('/Api/categorie4', categorieApiController.listeCat4);
router.get('/Api/categorie5', categorieApiController.listeCat5);
router.post('/newcat', categorieApiController.addcat);


// Route User
var userController = require('./controllers/userController');

// router.get('/', (request, response) => response.redirect('/user'));
 module.exports = router;