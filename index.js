function getIssues() {
  fetch('https://api.github.com/repos/nmlstyl/javascript-fetch-lab/issues', {
    method: 'get',
    headers: {
      'Authorization': `token ${getToken()}`
    },
  }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    showIssues(myJson);
  });
}

function showIssues(json) {
    let jsonHtml = json.map(j => {return `<li><div class="issueContents">
                          <div class="issueTitle">${j.title}</div>
                          <div class="issueBody">${j.body}</div>
                          </div></li><br>`}).join(" ")
    $('#issues').append('<ul>' + jsonHtml + '</ul>')
}

function createIssue() {
  let thisTitle = document.getElementById('title').value
  let thisBody = document.getElementById('body').value
  let postData = { title: thisTitle, body: thisBody }
  fetch('https://api.github.com/repos/nmlstyl/javascript-fetch-lab/issues', {
    method: 'post',
    headers: {
      'Authorization': `token ${getToken()}`
    },
    body: JSON.stringify(postData)
  }).then(function(response) {
    getIssues();
  })
}

function showResults(json) {
    $('#results').append(`<a href=${json.html_url}>${json.html_url}</a>`)
}

function forkRepo() {
  const repo = 'learn-co-curriculum/javascript-fetch-lab'

  fetch('https://api.github.com/repos/' + repo + '/forks', {
    method: 'post',
    headers: {
      'Authorization': `token ${getToken()}`
    }
  }).then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    showResults(myJson);
  });
}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ``
}
