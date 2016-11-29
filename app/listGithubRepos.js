function listGithubRepos(username){
  var request     = require('superagent/superagent');
  
  var repos = [] ;

  //retrieve repos
  
  request
    .get('https://api.github.com/users/'+username+'repos')
    .set('Accept', 'application/json')
    .end(function(err,res){
      if((res.status == 200) && !err){
        var ans = (res.body);
        if (ans.length == 0){
          return 'no repository';
        } else{
          for(var i=0;i<ans.length;i++){
            repos.push(ans[i].name);
          };
        }
      }
      });

    return(repos);

}

module.exports = listGithubRepos;