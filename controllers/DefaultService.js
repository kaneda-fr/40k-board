'use strict';

exports.classementGET = function(args, res, next) {
  /**
   * show board
   * return the ranking board
   *
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "armee" : "aeiou",
  "classement" : 0.80082819046101150206595775671303272247314453125,
  "nom" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.joueurNomGET = function(args, res, next) {
  /**
   * return a player by id
   *
   * nom String nom du joueur
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "date" : "2000-01-23T04:56:07.000+00:00",
  "vainqueur" : "aeiou",
  "perdant" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.matchGET = function(args, res, next) {
  /**
   * return list of match
   *
   * returns joueur
   **/
  var examples = {};
  examples['application/json'] = {
  "armee" : "aeiou",
  "classement" : 0.80082819046101150206595775671303272247314453125,
  "nom" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.matchPUT = function(args, res, next) {
  /**
   * record a match
   *
   * vainqueur String nom du vainqueur
   * perdant String nom du perdant
   * date Date nom du joueur (optional)
   * returns joueur
   **/
  var examples = {};
  examples['application/json'] = {
  "armee" : "aeiou",
  "classement" : 0.80082819046101150206595775671303272247314453125,
  "nom" : "aeiou"
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

