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

$(document).ready(function() {
    // call the filterCards function whenever a dropdown menu value changes
    $('#selectContinent, #selectCategory').change(filterCards);
  
    function filterCards() {
      let selectedContinent = $('#selectContinent').val();
      let selectedCategory = $('#selectCategory').val();
  
      $('.card').each(function() {
        let cardContinent = $(this).data('continent');
        let cardCategory = $(this).data('category');
  
        if ((selectedContinent === 'All Continents' || selectedContinent === cardContinent) && 
            (selectedCategory === 'All Categories' || selectedCategory === cardCategory)) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });
