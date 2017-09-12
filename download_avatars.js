require('dotenv').config();
const request = require('request');

const gitUser = process.env.GITHUB_USER;
const gitToken= process.env.GITHUB_TOKEN;
function getRepoContributors(repoOwner, repoName, cb) {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'GitHub Avatar Downloader - Student Project'
    }
  };
  request(options, function (error, response, body) {
  if (error) {
    console.log(error);
    return;
  }
  const data = JSON.parse(body);
    data.forEach((contributor) => {
      console.log(contributor.avatar_url);
    });
  });
}
function downloadImageByURL(url, filePath) {
  // ...
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});
