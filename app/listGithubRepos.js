"use strict";

var chalk       = require('chalk');
var clear       = require('clear');
var CLI         = require('clui');
var figlet      = require('figlet');
var inquirer    = require('inquirer');
var Preferences = require('preferences');
var Spinner     = CLI.Spinner;
var GitHubApi   = require('github');
/*var _           = require('lodash');
var git         = require('simple-git')();
var touch       = require('touch');
var fs          = require('fs');
var files       = require('./lib/files');*/

//Initialization
clear();
console.log(
  chalk.yellow(
    figlet.textSync('List Github Repositories', { horizontalLayout: 'full' })
  )
);

//GitHub API
var github = new GitHubApi({
  version: '3.0.0'
});

function getGithubCredentials(callback) {
  var questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Enter your Github username or e-mail address:',
      validate: function( value ) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your username or e-mail address';
        }
      }
    },
    {
      name: 'password',
      type: 'password',
      message: 'Enter your password:',
      validate: function(value) {
        if (value.length) {
          return true;
        } else {
          return 'Please enter your password';
        }
      }
    }
  ];

  inquirer.prompt(questions).then(callback);
}

function getGithubToken(callback) {
  var prefs = new Preferences('githubRepos');

  if (prefs.github && prefs.github.token) {
    return callback(null, prefs.github.token);
  }

  getGithubCredentials(function(credentials) {
    var status = new Spinner('Authenticating you, please wait...');
    status.start();

    github.authenticate(
      _.extend(
        {
          type: 'basic',
        },
        credentials
      )
    );

    github.authorization.create({
      scopes: ['user', 'public_repo', 'repo', 'repo:status'],
      note: 'githubRepos, the command-line tool that displays your gitHub '
    }, function(err, res) {
      status.stop();
      if ( err ) {
        return callback( err );
      }
      if (res.token) {
        prefs.github = {
          token : res.token
        };
        return callback(null, res.token);
      }
      return callback();
    });
  });
}


function githubAuth(callback) {
  getGithubToken(function(err, token) {
    if (err) {
      return callback(err);
    }
    github.authenticate({
      type : 'oauth',
      token : token
    });
    return callback(null, token);
  });
}

function listRepos(callback){
    var questions = [
      {
        type: 'list',
        name: 'visibility',
        message: 'all, public, or private:',
        choices: [ 'all', 'public', 'private' ],
        default: 'all'
      }
    ];

    inquirer.prompt(questions).then(function(answer){
      var status = new Spinner('Listing repositories...');
      status.start();

      var data = {
        affiliation : 'owner',
        visibility : answer.visibility
      };

      github.repos.getAll({
        data,
        function(err,res) {
          status.stop();
          if (err) {
            return callback(err);
          }
          return callback(null,res);
        }
      });
    });
    
}

//Main function
githubAuth(function(err, authed) {
  if (err) {
    switch (err.code) {
      case 401:
        console.log(chalk.red('Couldn\'t log you in. Please try again.'));
        break;
      case 422:
        console.log(chalk.red('You already have an access token.'));
        break;
    }
  }
  if (authed) {
    console.log(chalk.green('Sucessfully authenticated!'));

    listRepos(function(err,res){
      if(err) {
        console.log('An error occured');
      } else {
        console.log(res);
        if(res.length > 0){
          res.foreach(function(rep){
            console.log("ID : ", repo.id);
                console.log("NAME : ", repo.name);
                console.log("FULL NAME : ", repo.full_name);
                console.log("IS PRIVATE : ", repo.private);
                console.log("URL : ", repo.html_url);
                console.log("DESCRIPTION : ", repo.description);

                console.log("\n");
          })
        } else {
          console.log('No repositories')
        }

        console.log(chalk.green('All done!'));
      }
    });
  }
});