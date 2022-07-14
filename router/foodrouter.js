var express = require('express');
var router = express.Router();
var foodcontroller = require('../controller/foodcontroller');

// router.get('/queryall', empcontroller.queryall);
router.get('/query', foodcontroller.query);
router.get('/delete', foodcontroller.delete);
router.post('/insert', foodcontroller.insert);
router.post('/update', foodcontroller.update);
router.post('/updatechk', foodcontroller.updatechk);

module.exports = router;
