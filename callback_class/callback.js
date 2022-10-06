//parallel promise
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('async call to FB 1...')
    resolve(1)
  })
})
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('async call to TWITTER 2...')
    resolve(2)
  })
})

Promise.all([p1, p2]).then(result => console.log(result))




//call back hell

// getUser('1', (user) => {
//   console.log('username -- ', user);
//   getRepositories(user.username, (repos) => {
//     console.log('repos--', repos);
//     getCommits('2', (commits) => {
//       console.log('-=-=> commits', commits);
//     })
//   })
// })


console.log('Before')
// getUser('1', displayUsers)

// using promises
// getUser('1').then(user => {
//   console.log('username -- ', user);
//   return getRepositories(user.username).then(repos => {
//     console.log('repos--', repos);
//     return getCommits('2').then(commits =>  console.log('-=-=> commits', commits));
//   })
// }).catch(err => console.log('Error', err.message))
console.log('After')



// Named functions
function displayUsers(user) {
  console.log('username -- ', user);
  getRepositories(user.username, displayRepos)
}

function displayRepos(repos) {
  console.log('repos--', repos);
  getCommits('2', displayCommit);
}

function displayCommit(commits){
  console.log('-=-=> commits', commits);
}

function getUser(id){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Making API call..')
      resolve({id, username: 'john'})
    }, 2000) 
  })
}

function getRepositories(username){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fetching repo...');
      resolve({username, repos: ['repo1', 'repo2']});
    }, 2000)
  })
}

function getCommits(commits){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fetching commits...');
      resolve(['commit1', 'commits2']);
    }, 2000)
  })
}


