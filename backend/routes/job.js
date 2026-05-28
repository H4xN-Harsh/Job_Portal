const express = require('express');
const router = express.Router();
const {create,all,getJob,updateJob,deleteJob} = require('../controllers/jobControllers');
const protect = require('../middleware/auth')
router.post('/create',protect,create)
router.get('/all',all)
router.get('/:id',getJob)
router.put('/:id',protect,updateJob)
router.delete('/:id',protect,deleteJob)


module.exports = router;