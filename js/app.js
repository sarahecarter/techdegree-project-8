// Global Variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&?inc=name, picture, email, location, phone, dob &noinfo &nat=us`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-container");
const modalClose = document.querySelector(".modal-close");