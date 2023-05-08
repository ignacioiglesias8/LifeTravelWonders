// Elementos del DOM
const continentSelect = document.querySelector("#continent-filter");
const countrySelect = document.querySelector("#country-filter");
const regionSelect = document.querySelector("#region-filter");
const cardRow = document.querySelector("#card-row");

// Define una función para crear una tarjeta de sitio turístico
function createSiteCard(site) {
    const card = document.createElement("div");
    card.classList.add("col-md-4");
    const html = `
    <div class="card mb-4 box-shadow">
    <img class="card-img-top" src="${site.image}" alt="${site.name}">
    <div class="card-body">
        <h3 class="row card-title justify-content-center">${site.name}</h3>
        <p class="card-text text-justify">${site.description}</p>
    </div>
    </div>`;
    card.innerHTML = html;
    return card;
}

// Define una función para agregar los sitios turísticos a la página
function addSitesToPage(sites) {
    cardRow.innerHTML = "";
    sites.forEach((site) => {
        const card = createSiteCard(site);
        cardRow.appendChild(card);
    });
}

// Agrega todos los sitios turísticos a la página al cargar la página
addSitesToPage(sites);

// Define una función para crear la lista de países
function createCountryList(sites) {
    const countries = [];
    sites.forEach((site) => {
        if (!countries.includes(site.country)) {
            countries.push(site.country);
        }
    });
    countrySelect.innerHTML = `<option value="all-countries">All Countries</option>`;
    countries.forEach((country) => {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    });
}

// Define una función para crear la lista de regiones
function createRegionList(sites) {
    const regions = [];
    sites.forEach((site) => {
        if (!regions.includes(site.region)) {
            regions.push(site.region);
        }
    });
    regionSelect.innerHTML = `<option value="all-regions">All Regions</option>`;
    regions.forEach((region) => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

// Filtros de continente, país y región
let filteredSites = sites

continentSelect.addEventListener("change", () => {
    const selectedContinent = continentSelect.value;
    filteredSites;
    if (selectedContinent === "all") {
        filteredSites = sites;
        countrySelect.innerHTML = `<option value="all-countries">All Countries</option>`;
        regionSelect.innerHTML = `<option value="all-regions">All Regions</option>`;
    } else {
        filteredSites = sites.filter((site) => site.continent === selectedContinent);
        createCountryList(filteredSites);
    }
    addSitesToPage(filteredSites);
});

countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    let filteredSites;
    if (selectedCountry === "all-countries") {
        const selectedContinent = continentSelect.value;
        regionSelect.innerHTML = `<option value="all-regions">All Regions</option>`;
        if (selectedContinent === "all") {
            filteredSites = sites;
        } else {
            filteredSites = sites.filter((site) => site.continent === selectedContinent);
        }
        createCountryList(filteredSites);
    } else {
        filteredSites = sites.filter((site) => site.country === selectedCountry);
        createRegionList(filteredSites);
    }
    addSitesToPage(filteredSites);
});

regionSelect.addEventListener("change", () => {
    const selectedRegion = regionSelect.value;
    const selectedCountry = countrySelect.value;
    let filteredSites;
    if (selectedRegion === "all-regions") {
        if (selectedCountry === "all-countries") {
            filteredSites = sites;
        } else {
            filteredSites = sites.filter((site) => site.country === selectedCountry);
        }
        createRegionList(filteredSites);
    } else {
        filteredSites = sites.filter((site) => site.region === selectedRegion);
    }
    addSitesToPage(filteredSites);
});

// Elemetos para la la paginación
let itemsPerPage = 6;
let currentPage = 1;
let items = document.querySelectorAll('.card');
let numItems = filteredSites.length;
let numPages = Math.ceil(numItems / itemsPerPage);
let pagination = document.querySelector('.pagination');
let cards = document.querySelector('.cards');

// Agregar botones atrás, páginas y adelante
let prevPage = document.createElement('li');
prevPage.classList.add('page-item');
let prevLink = document.createElement('a');
prevLink.classList.add('page-link', 'prev');
prevLink.setAttribute('href', '#', );
prevLink.setAttribute('aria-label', 'Previous');
prevLink.innerHTML = '<span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span>';
prevPage.appendChild(prevLink);
pagination.appendChild(prevPage);

for (let i = 1; i <= numPages; i++) {
    let page = document.createElement('li');
    page.classList.add('page-item');
    if (i === 1) {
        page.classList.add('active');
    }
    let link = document.createElement('a');
    link.classList.add('page-link');
    link.setAttribute('href', '#');
    link.setAttribute('data-page', i);
    link.innerHTML = i;
    page.appendChild(link);
    pagination.appendChild(page);
}

let nextPage = document.createElement('li');
nextPage.classList.add('page-item');
let nextLink = document.createElement('a');
nextLink.classList.add('page-link', 'next');
nextLink.setAttribute('href', '#');
nextLink.setAttribute('aria-label', 'Next');
nextLink.innerHTML = '<span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span>';
nextPage.appendChild(nextLink);
pagination.appendChild(nextPage);

//Funciones para mostrar y navegar por números de página
function showPage(page) {
    let startIndex = (page - 1) * itemsPerPage;
    let endIndex = Math.min(startIndex + itemsPerPage, numItems);
    for (let i = 0; i < numItems; i++) {
        items[i].classList.toggle('d-none', i < startIndex || i >= endIndex);
    }
    let pages = document.querySelectorAll('.pagination li');
    for (let k = 0; k < pages.length; k++) {
        pages[k].classList.remove('active');
    }
    pages[page].classList.add('active');
}

showPage(1)

pagination.addEventListener('click', function (event) {
    event.preventDefault();
    const cards = document.querySelector("#destinations");
    cards.scrollIntoView({ behavior: "smooth" });
    if (event.target.nodeName === 'A') {
        let page = parseInt(event.target.getAttribute('data-page'));
        showPage(page);
    }
});