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
router.get('/addcategorie', categorieController.catFormAdd);
router.get('/categoriebtn/:CatName', categorieController.catbtn);
router.post('/newcat', categorieController.addcat);
router.get('/categoriename', categorieController.categoriename);
// Route API CATEGORIE
router.get('/Api/categorie1', categorieApiController.listeCat1);
router.get('/Api/categoriebtn/:CatName', categorieApiController.catbtn);
router.post('/Api/newcat', categorieApiController.addcat);
router.get('/Api/categoriebtn/:CatName', categorieApiController.catbtn);


// Route User
router.get('/register', userController.userFormadd);
router.post('/auth_register', userController.register);
router.get ('/userHome', userController.home);
router.post('/auth_login', userController.login);
router.post('/userRemove', userController.userRemove);
router.get('/confirm', userController.confirm);
router.get('/userFormUpdate', userController.UpdateFormUser);
router.post('/userUpdate/:userid', userController.updateUser);



 module.exports = router;