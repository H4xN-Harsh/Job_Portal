const express = require('express');
const router =  express.Router();
const protect = require("../middleware/auth");
const {apply,all,my,status} = require('../controllers/applicationControllers')
router.post('/apply/:jobId',protect,apply);
router.get('/all',protect,all);
router.get('/my',protect,my);
router.put('/status/:id',protect,status)

module.exports = router