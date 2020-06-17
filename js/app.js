// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&?inc=name, picture, email, location, phone, dob &noinfo &nat=us`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-container");
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
        let city = employee.city;
        let picture = employee.picture;

    employeeHTML =+ `
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