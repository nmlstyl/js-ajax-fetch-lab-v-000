function getIssues() {
  const urlText = $('#results')[0].innerText.slice(19)
  fetch('https://api.github.com/repos/' + urlText + '/issues', {
    method: 'GET',
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
  const urlText = $('#results')[0].innerText.slice(19)
  let thisTitle = $('#title')[0].value
  let thisBody = $('#body')[0].value
  let postData = { title: thisTitle, body: thisBody }
  fetch('https://api.github.com/repos/' + urlText + '/issues', {
    method: 'POST',
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
    method: 'POST',
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
  return `8274b1fdf13c036daac37dbd618fd0c1a08c81fa`
}
