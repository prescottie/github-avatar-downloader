require('dotenv').config();
const request = require('request');

const gitUser = process.env.GITHUB_USER;
const gitToken= process.env.GITHUB_TOKEN;
function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ gitUser + ':' + gitToken + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  console.log(requestURL);
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
