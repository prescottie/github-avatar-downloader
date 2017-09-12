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
    },
    qs: {
      acess_token: gitToken
    }

  };
  request(options, function (error, response, body) {
    if (error) {
      cb(error);
      return;
    }

    const data = JSON.parse(body);

    if (data.message) {
      cb(data)
      return;
    }
    cb(undefined, data);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .pipe(fs.createWriteStream(filePath));
}

getRepoContributors(process.argv[2], process.argv[3], function(error, result) {
  if (error) {
    console.log('Error:', error);
    return error;
  } else {
    for (var i in result){
      let contributor = result[i];
      let loginFilePath = `./avatars/${contributor.login}.jpg`;
      downloadImageByURL(contributor.avatar_url, loginFilePath);
    }
  }
});
