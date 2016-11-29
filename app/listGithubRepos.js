function listGithubRepos(username){
  var request = require('request');
  request('https://api.github.com/users/'+username+'repos',function(error,response,body){
      if(response.statusCode == 200){
        if (body.length == 0){
          console.log('no repository');
        } else{
          for(var i=0;i<body.length;i++){
            repos.push(body[i].name);
          };
        }
      } else {
        console.log('error: '+ response.statusCode)
      }
    }
  );
}

module.exports = listGithubRepos;