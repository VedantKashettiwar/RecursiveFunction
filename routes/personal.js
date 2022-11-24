const express = require('express');
const router = express.Router()

const{createDetails,fetchDetails,showDetails,saveDetailsByPagination,saveDetailsByPagination2} = require('../controllers/personal')
    

router.route('/createpersonal/').post(createDetails)
router.route('/fetchdetails/').get(fetchDetails)
router.route('/showdetails/').get(showDetails)
router.route('/savedetailsbypagination/').get(saveDetailsByPagination)
router.route('/savedetailsbypagination2/').get(saveDetailsByPagination2)

module.exports = router
