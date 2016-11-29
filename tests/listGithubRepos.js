// testing code goes here

'use strict'

// testing function listGithubRepos
var listGithubRepos = require('../app/listGithubRepos.js');

var nock = require('nock');
 
var couchdb = nock('https://api.github.com')
                .get('/users/centia28/repos')
                .reply(200, function(uri, requestBody) {
     				return requestBody;
   				});

describe('Test: ', function () {

  describe('Test conection', function () {
    listGithubRepos('centia28');
  });
});