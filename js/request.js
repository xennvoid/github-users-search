const ghubURL = 'https://api.github.com/users/';
const form = document.querySelector('.form');
const input = document.querySelector('.search');
const main = document.querySelector('.main');

input.focus();

form.onsubmit = function(e){
    e.preventDefault();

    if(input.value == '') return;

    const userLogin = input.value;

    const userCard = findGitHubUser(userLogin, ghubURL);
}


async function findGitHubUser(userLogin, ghubURL) {
    const res = await fetch(ghubURL+userLogin);

    if(res.status == 404) return;
    
    const data = await res.json();
    console.log(data);

    createUserCard(data);
    getRepos(userLogin, ghubURL);
}

function createUserCard(user) {
    const userCard = `<div class="user">
        <div class="user__photo">
            <img src="${user.avatar_url}" alt="user-avatar">
        </div>
        <div class="user__info">
            <div class="user__name">
                <a href="${user.html_url}" target="_blank"><strong>${user.login}</strong></a>
            </div>
            <div class="user__bio">${user.bio || ''}</div>
            <div class="user__followers">Followers:${user.followers}</div>
            <div class="user__followers">Repos:${user.public_repos}</div>
        </div> 
    </div>`;

    main.innerHTML = userCard;
}

async function getRepos(userLogin, ghubURL) {
    const res = await fetch(ghubURL+userLogin+'/repos');
    const data = await res.json();

    console.log(data);
    displayUserRepos(data);
}

function displayUserRepos(repos) {
    document.querySelector('.user__info').insertAdjacentHTML('beforeend',`<div class="user__repos">
    <div class="user__repos-title">
        <strong>Repos</strong>
    </div>
    </div>`);

    const reposDiv = document.querySelector('.user__repos');

    if(repos.length == 0)
        document.querySelector('.user__repos').remove();

    else{
        repos.forEach(repo => {
            reposDiv.insertAdjacentHTML('beforeend',`<a class="user__repo" href="${repo.clone_url}" target="_blank">${repo.name}</a>`);
        });
    }  
}