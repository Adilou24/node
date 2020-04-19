// Get an instance of the express Router and set routes
let express = require('express');
let router = express.Router();              
// controller
var userController = require('./controllers/userController');
var seriesController = require('./controllers/seriesController');
var categorieController = require('./controllers/categorieController')

router.get('/', (request, response) => response.redirect('/userHome'));
// Route SERIE
// router.get('/user', userController.userHome);
router.get('/mainpage', seriesController.mainpage);
router.get('/addserie', seriesController.serieFormAdd);
router.post('/newserie', seriesController.addserie);
router.get('/updateformserie/:SerieID', seriesController.serieFormUpdate);
router.post ('/updateserie', seriesController.updateseries);
router.get('/deleteformserie/:SerieID', seriesController.serieFormRemove);
router.post('/deleteserie/:SerieID', seriesController.serieRemove);
router.get('/Search', seriesController.Search);
router.get('/EnCours', seriesController.encours);
router.get('/Finis', seriesController.Finis);
// Route CATEGORIE
router.get('/categorie1', categorieController.listeCat1);
router.get('/categorie2', categorieController.listeCat2);
router.get('/categorie3', categorieController.listeCat3);
router.get('/categorie4', categorieController.listeCat4);
router.get('/categorie5', categorieController.listeCat5);
router.get('/addcategorie', categorieController.catFormAdd);
router.post('/newcat', categorieController.addcat);
// Route User
var userController = require('./controllers/userController');

router.get('/', (request, response) => response.redirect('/user'));
router.get('/user/add', userController.userFormAdd);
router.post('/user/new', userController.userNew);
router.get('/user/update/:iduser', userController.userFormUpdate);
router.get('/user/delete/:iduser', userController.userRemove);

 module.exports = router;