
const gallery = document.querySelector('#gallery');

/**
 * create function to fetch users data from URL and parse to JSON
 * @param {string} url - link to API
 */
function fetchData(url) {
    return fetch(url)
        .then(response => response.json());
}


// create function to dynamically add users to web page
function createUsers() {
    for(let i = 0; i < 12; i++) {
        fetchData('https://randomuser.me/api/')
            .then(data => addUsers(data));
    }
}

/**
 * function to dynamically add users to web page
 * @param {Object} data - JSON response from fetched users data
 */
function addUsers(data) {
    const imageThumbnail = data.results[0].picture.large;
    const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
    const email = data.results[0].email;
    const location = data.results[0].location;

    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${imageThumbnail}" alt="profile picture">
        </div>
    
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${name}</h3>
            <p class="card-text">${email}</p>
            <p class="card-text cap">${location.city}, ${location.state}</p>
        </div>
    </div>
    `;

    gallery.innerHTML += html;
}

createUsers();
