const express = require('express');
const router = express.Router()

const{createDetails,fetchDetails,showDetails,saveDetailsByPagination} = require('../controllers/personal')
    

router.route('/createpersonal/').post(createDetails)
router.route('/fetchdetails/').get(fetchDetails)
router.route('/showdetails/').get(showDetails)
router.route('/savedetailsbypagination/').get(saveDetailsByPagination)

module.exports = router
