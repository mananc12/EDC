const express = require('express'),
  commonRouter = express.Router(),
  commonController = require('../controllers/common')

commonRouter.get('/get-latest-poster', commonController.getLatestPosterImage)

module.exports = commonRouter
