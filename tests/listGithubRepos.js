// testing code goes here

'use strict'

// testing function listGithubRepos
var listGithubRepos = require('../app/listGithubRepos.js');

describe('Test: ', function () {

  describe('Test conection', function () {
    console.log("Repository are: "+listGithubRepos('centia28'));
  });
});