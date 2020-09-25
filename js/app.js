// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
function fetchData(url) {
    return fetch(url)
        .then(checkStatus)
        .then(response => response.json())
        .catch(error => console.log('something went wrong', error))
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
            data.results.forEach((user) => {
                generateUserCard(user);
                generateUserModal(user);
            })
        }
    );

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// Check de server status, if the status is "ok" return promise.
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    }
    else {
        return Promise.reject(new Error(response.statusText))
    }
}

// Handle click interaction on the user card to open the correct user modal
function clickHandler(id) {
    const userModal = document.querySelector(`[data-user-modal="${id}"]`);
    userModal.style.display = 'block';
}

// Create a HTML template for the user card
function generateUserCard(user) {
    const gallery = document.getElementById('gallery');
    const { uuid } = user.login;

    // Create a html template for the user card with info needed from the user
    const galleryItem = `
        <div class="card" onclick="clickHandler('${uuid}')">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
    `;
    // append the user card in the gallery wrapper
    gallery.insertAdjacentHTML('beforeend', galleryItem);
}

// Create a HTML template for the clicked user modal
function generateUserModal(user) {
    const gallery = document.getElementById('gallery');
    // change the format of the given dob into desired format: 'MM/DD/YYYY'
    let dateOfBirth = new Date(user.dob.date).toLocaleString("en-US").split(",")[0];
    // change the format of the given phone number into desired format: '(555) 555-5555'
    let phoneNumber = user.phone.replace(user.phone.charAt(5), ' ')

    // Create a html template for the user modal with info needed from the user
    const userModal = `
        <div class="modal-container" data-user-modal="${user.login.uuid}">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${phoneNumber}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${dateOfBirth}</p>
                </div>
            </div>
        </div>
    `;

    // append the user card in the gallery wrapper
    gallery.insertAdjacentHTML('afterend', userModal);

    const getModal = document.querySelector('[data-user-modal]');
    const closeBtn = document.querySelector('#modal-close-btn');

    // By clicking on the close button of the modal, hide the modal
    closeBtn.addEventListener('click', (e) => {
        getModal.style.display = 'none';
    });
}