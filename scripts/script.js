const continentSelect = document.querySelector("#continent-filter");
const countrySelect = document.querySelector("#country-filter");
const regionSelect = document.querySelector("#region-filter");
const siteList = document.querySelector("#card-row");

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
    siteList.innerHTML = "";
    sites.forEach((site) => {
        const card = createSiteCard(site);
        siteList.appendChild(card);
    });
}

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

// Agrega todos los sitios turísticos a la página al cargar la página
addSitesToPage(sites);

continentSelect.addEventListener("change", () => {
    const selectedContinent = continentSelect.value;
    let filteredSites;
    if (selectedContinent === "all") {
        filteredSites = sites;
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