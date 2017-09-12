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
    cb(error, data);
  });
}
function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors("jquery", "jquery", function(error, result) {
  if (error) {
    return;
  } else {
    for (var i in result){
      let contributor = result[i];
      let loginFilePath = `./avatars/${contributor.login}.jpg`;
      downloadImageByURL(contributor.avatar_url, loginFilePath);
    }
  }
});
