require('dotenv').config();
const request = require('request');
const fs = require('fs');

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
      request.get(url)
        .on('error', function (err) {
        throw err;
        })
        .pipe(fs.createWriteStream('./kvirani.jpg'));

}
downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");

// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log("Errors:", err);
//   console.log("Result:", result);
// });
