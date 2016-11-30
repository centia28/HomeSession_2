var request = require('request-promise');

var options = {
    method: "GET",
    uri: "https://api.github.com/users/centia28/repos",
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
};

request(options)
    .then( function(response) {
        // console.log(response);
        response.forEach(function (repo) {
          console.log("ID : ", repo.id);
          console.log("NAME : ", repo.name);
          console.log("FULL NAME : ", repo.full_name);
          console.log("IS PRIVATE : ", repo.private);
          console.log("URL : ", repo.html_url);
          console.log("DESCRIPTION : ", repo.description);

          console.log("\n");
        })
    })
    .catch(function(error) {
        console.log(error);
    })
;