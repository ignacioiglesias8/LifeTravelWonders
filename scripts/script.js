// Define a function to generate a card for each tourist site
function generateCards() {
    const cardRow = document.getElementById("card-row");
    for (let i = 0; i < sites.length; i++) {
        const site = sites[i];
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
        cardRow.appendChild(card);
    }
}

generateCards();

const continentSelect = document.querySelector("#continent-filter");
continentSelect.addEventListener("change", () => {
    const selectedContinent = continentSelect.value;
    let filteredSites;    
    if (selectedContinent === "all") {
        filteredSites = sites;
    } else {
        filteredSites = sites.filter(site => site.continent === selectedContinent);
    }
    const siteList = document.querySelector("#card-row");
    siteList.innerHTML = "";
    filteredSites.forEach(site => {
        const listItem = document.createElement("div");
        listItem.classList.add("col-md-4");
        listItem.innerHTML = `
        <div class="card mb-4 box-shadow">
        <img class="card-img-top" src="${site.image}" alt="${site.name}">
        <div class="card-body">
            <h3 class="row card-title justify-content-center">${site.name}</h3>
            <p class="card-text text-justify">${site.description}</p>
        </div>
        </div>`;
        siteList.appendChild(listItem);
    });
});

const countrySelect = document.querySelector("#country-filter");
countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    let filteredSites;    
    if (selectedCountry === "all") {
        filteredSites = sites;
    } else {
        filteredSites = sites.filter(site => site.country === selectedCountry);
    }
    const siteList = document.querySelector("#card-row");
    siteList.innerHTML = "";
    filteredSites.forEach(site => {
        const listItem = document.createElement("div");
        listItem.classList.add("col-md-4");
        listItem.innerHTML = `
        <div class="card mb-4 box-shadow">
        <img class="card-img-top" src="${site.image}" alt="${site.name}">
        <div class="card-body">
            <h3 class="row card-title justify-content-center">${site.name}</h3>
            <p class="card-text text-justify">${site.description}</p>
        </div>
        </div>`;
        siteList.appendChild(listItem);
    });
});
