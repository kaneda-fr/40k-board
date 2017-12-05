'use strict';

var url = require('url');

var Default = require('./DefaultService');

module.exports.classementGET = function classementGET (req, res, next) {
  Default.classementGET(req.swagger.params, res, next);
};

module.exports.joueurNomGET = function joueurNomGET (req, res, next) {
  Default.joueurNomGET(req.swagger.params, res, next);
};

module.exports.matchGET = function matchGET (req, res, next) {
  Default.matchGET(req.swagger.params, res, next);
};

module.exports.matchPUT = function matchPUT (req, res, next) {
  Default.matchPUT(req.swagger.params, res, next);
};
