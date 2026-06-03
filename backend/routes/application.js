const express = require('express');
const router =  express.Router();
const protect = require("../middleware/auth");
const {apply,all,my,status} = require('../controllers/applicationControllers');
const upload = require('../middleware/upload');
router.post('/apply/:jobId',protect,upload.single('resume'),apply);
router.get('/all',protect,all);
router.get('/my',protect,my);
router.put('/status/:id',protect,status)

module.exports = router