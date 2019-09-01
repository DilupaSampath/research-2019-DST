'use strict';
// Import Express
const express = require('express');
// user router
const router = express.Router();
// Import body parser
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.json());

// import  controllers
const userController = require('../src/user/userController');
const pumpController = require('../src/pumps/pumpController');
// import validator Schemas
const userSchema = require('../src/user/userSchema');
const pumpSchema = require('../src/pumps/pumpSchema');

// import Validator class
const validator = require('../services/validator');

//user routes
router.route('/user/new')
    .post(validator.validateBody(userSchema.newUser), userController.newUser);
router.route('/user/login')
    .post(validator.validateBody(userSchema.login), userController.login);


//pump routes
router.route('/pumps')
    .get(validator.validateHeader(), pumpController.getAllPumps);
    
router.route('/pumps/registered')
    .get(validator.validateHeader(), pumpController.getRegisteredPumps);
router.route('/pump/update')
    .post(validator.validateBodyWithToken(pumpSchema.updatePump),
        pumpController.updatePump);
router.route('/pump/delete')
    .post(validator.validateBodyWithToken(pumpSchema.pumpId),
        pumpController.removePump);
router.route('/pump/findOne')
    .post(validator.validateBodyWithToken(pumpSchema.pumpId),
        pumpController.findOnePump);

   
module.exports = router;