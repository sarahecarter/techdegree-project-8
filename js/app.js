// Global Variables
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalClose = document.querySelector(".modal-close");

// Fetch Data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err));

// Create Display Employees Function
function displayEmployees(employeedata) {

    employees = employeedata;

    // Store the employee HTML as we create it
    let employeeHTML = '';

    // Loop through each employee
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;
}

// Create Display Modal Function
function displayModal(index) {
    let { 
        name, 
        dob, 
        phone, 
        email, 
        location: { 
            street,
            city, 
            state, 
            postcode }, 
        picture 
    } = employees[index]  

    


    const modalContainer = document.querySelector(".modal-content");
    let date = new Date(dob.date);
    let modalHTML = '';

    modalHTML += `
        <img class="avatar" src="${picture.large}" />
        <div class="text-container">
            <h2 class="name">${name.first} ${name.last}</h2>
            <p class="email">${email}</p>
            <p class="address">${city}</p>
            <hr />
            <p>${phone}</p>
            <p class="address">${street.name} ${street.number}, ${state} ${postcode}</p>
            <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
        <button class="switch" id="last"><</button>
        <button class="switch" id="next">></button>
    `;

    modalContainer.innerHTML = modalHTML;
    
    overlay.classList.remove("hidden");

    let nextButton = document.getElementById('next');
    let lastButton = document.getElementById('last');

    //hide buttons if it is the first or last card
    if (index > 10) {
        nextButton.style.display = 'none';
    }

    if (index < 1) {
        lastButton.style.display = 'none';
    }

    //next button event listener
    nextButton.addEventListener('click', () => {
        //add to index
        index ++;
        //display new index modal
        displayModal(index);
    })

    //last button event listener
    lastButton.addEventListener('click', () => {
        //add to index
        index --;
        //display new index modal
        displayModal(index);
    })
    
}

// Event Listeners 
gridContainer.addEventListener('click', e => {
    if (e.target !== gridContainer) {
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');
        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

//Search Functionality
