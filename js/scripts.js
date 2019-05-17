const gallery = document.querySelector('#gallery');

// add query string to API URL to retrieve a user nationality that will only return data in the English alphabet
const englishNationalities =  'au,br,ca,ch,de,dk,es,fi,fr,gb,ie,no,nl,nz,us';
const employeesUrl = `https://randomuser.me/api/?nat=${englishNationalities}&results=12`;

// invoke function to create modal container, search form and modal toggle
createModalDiv();
createSearch();
addModalToggle();

// fetch data from API for 12 users on load; call functions to add user to gallery and modal
// call catch method to handle any other errors that will occur 
window.addEventListener('load', () => {
    fetchData(employeesUrl)
        .then(data => {
            data.results.forEach(result => {
                addUsers(result);
                usersDetailDisplay(result);
            });
        })
        .catch(error => console.log(error));
});

// create function to add div element for the modal container
function createModalDiv() {
    const div = document.createElement('div');
    div.className = "modal-container";
    div.style.display = 'none';
    document.querySelector('body').insertBefore(div, gallery.nextElementSibling);
}

/**
 * create function to fetch users data from URL and parse to JSON
 * @param {string} url - link to API
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }catch(error) {
        throw error; 
    }
}

/**
 * function to dynamically add users to web page
 * @param {Object} data - JSON response from fetched users data
 */
function addUsers(data) {
        const imageThumbnail = data.picture.large;
        const name = `${data.name.first} ${data.name.last}`;
        const email = data.email;
        const location = data.location;
    
        // Use string interpolation to create HTML to add to gallery container
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
        // add html to gallery container
        gallery.innerHTML += html;

}

/**
 * function to dynamically add DOM element to modal container
 * @param {Object} data - takes user's data object fetched from API
 */
function usersDetailDisplay(data) {
    const image = data.picture.large;
    const name = `${data.name.first} ${data.name.last}`;
    const email = data.email;
    const location = data.location;
    const cellphone = data.cell;
    const dob = data.dob.date;
    const year = dob.substring(0,4);
    const month = dob.substring(5,7);
    const day = dob.substring(8,10);

    

    // Use string interpolation to create HTML to add to modal container
    const html = `
        <div class="modal" style='display: none'>
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${image}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${name}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${cellphone}</p>
                <p class="modal-text cap">${location.street}, ${location.state} ${location.postcode}</p>
                <p class="modal-text">Birthday: ${month}/${day}/${year}</p>
        </div>
    `;

    // add html to modal container
    document.querySelector('.modal-container').innerHTML += html;
}

// create search form and append to html
function createSearch() {
    const html = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
        </form>
    `;
    document.querySelector('.search-container').innerHTML = html;
}

function addModalToggle() {
    const div = document.createElement('div');
    div.className = 'modal-btn-container';

    const html = `
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    `;

    div.innerHTML = html;
    document.querySelector('.modal-container').appendChild(div);
}

/**
 * add event listener to loop through each cards; 
 * open modal when card is clicked
 * display modal details of user in the current index in forEach loop
 */
gallery.addEventListener('click', event => {
    document.querySelectorAll('.card').forEach((card, index) => {
        // check to see if the selected path includes the card element in the current loop of arrays
        if(event.composedPath().includes(card)) {
            document.querySelector('.modal-container').style.display = "block";     
            document.querySelectorAll('.modal')[index].style.display = "block";
        }
    });
});

/**
 * add event listener to modal container
 * if 'X' button is clicked, close modal
 * if 'Prev' button is clicked, hide current users detail and show previous
 * if 'Next' button is clicked, hide current users detail and display next
 */
document.querySelector('.modal-container').addEventListener('click', event => {
    const users = document.querySelectorAll('.modal');

    if(event.target.textContent === 'X') {
        document.querySelectorAll('.modal').forEach(modal => modal.style.display = 'none');
        document.querySelector('.modal-container').style.display = 'none';
    }
    
    if(event.target.textContent === 'Prev') {
        users.forEach(user => {
            if(user.style.display === 'block' && user.previousElementSibling.style.display === 'none') {
                user.style.display = 'none';
                user.previousElementSibling.style.display = 'block';
            }
        });   
    }

    if(event.target.textContent === 'Next') {
        for(let i = 0; i < users.length; i++) {
            if(users[i].style.display === 'block' && users[i].nextElementSibling !== null && users[i].nextElementSibling.style.display === 'none') {

                users[i].style.display = 'none';
                users[i].nextElementSibling.style.display = 'block';
                break;
            } 
        }
    }
});

/**
 * add event listener to search form to dynamically filter directory
 */
document.querySelector('#search-input').addEventListener('keyup', event => {
    const name = document.querySelectorAll('#name');
    const searchValue = event.target.value.toLowerCase();

    name.forEach(name => {
        if(!name.textContent.includes(searchValue)) {
            name.parentNode.parentNode.style.display = 'none';
        } else {
            name.parentNode.parentNode.style.display = 'block';
        }

    });
});

