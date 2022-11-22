const express = require('express');
const router = express.Router()

const{createDetails,fetchDetails,showDetails} = require('../controllers/personal')
    

router.route('/createpersonal/').post(createDetails)
router.route('/fetchdetails/').get(fetchDetails)
router.route('/showdetails/').get(showDetails)

module.exports = router
