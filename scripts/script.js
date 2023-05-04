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

function filterCards() {
    const selectedContinent = $('#selectContinent').val();
    const selectedCategory = $('#selectCategory').val();
  
    let filteredSites = sites;
  
    if (selectedContinent !== 'All Continents') {
      filteredSites = filteredSites.filter(site => site.continent === selectedContinent);
    }
  
    if (selectedCategory !== 'All Categories') {
      filteredSites = filteredSites.filter(site => site.category === selectedCategory);
    }
  
    $('#cardDeck').empty();
  
    if (filteredSites.length === 0) {
      $('#cardDeck').append(`<div class="col-12 text-center"><p>No results found</p></div>`);
    } else {
      filteredSites.forEach(site => {
        $('#cardDeck').append(`
          <div class="col-md-4 mb-4">
            <div class="card">
              <img src="${site.image}" class="card-img-top" alt="${site.name}">
              <div class="card-body">
                <h5 class="card-title">${site.name}</h5>
                <p class="card-text">${site.description}</p>
                <p class="card-text"><strong>${site.continent}</strong></p>
                <p class="card-text"><strong>${site.category}</strong></p>
              </div>
            </div>
          </div>
        `);
      });
    }
  }

  $(document).ready(function() {
    // Call filterCards() whenever the user selects a continent or category
    $('#selectContinent, #selectCategory').on('change', function() {
      filterCards();
    });
  
    // Display all cards by default
    filterCards();
  });