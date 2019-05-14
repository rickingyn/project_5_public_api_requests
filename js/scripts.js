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
            .then(data => {
                addUsers(data);
                usersDetailDisplay(data);
            });
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

function usersDetailDisplay(data) {
    const image = data.results[0].picture.large;
    const name = `${data.results[0].name.first} ${data.results[0].name.last}`;
    const email = data.results[0].email;
    const location = data.results[0].location;
    const cellphone = data.results[0].cell;
    const dob = data.results[0].dob;

    const html = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${cellphone}</p>
                <p class="modal-text">${location.street}, ${location.city}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${dob.date}</p>
        </div>
    `;

    document.querySelector('.modal-container').innerHTML += html;
}

function createModalDiv() {
    const div = document.createElement('div');
    div.className = "modal-container";
    div.style.display = 'none';
    document.querySelector('body').insertBefore(div, gallery.nextElementSibling);
}

createUsers();
createModalDiv();


document.body.addEventListener('click',  event => {
    console.log(event.target)
});


document.querySelector('.card').addEventListener('click', event => {
    document.querySelector('.modal').style.display = "block";
});