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
    var selectedContinent = $('#selectContinent').val();
    var selectedCategory = $('#selectCategory').val();
  
    $('.card').each(function() {
      var cardContinent = $(this).data('continent');
      var cardCategory = $(this).data('category');
  
      if ((selectedContinent === 'All Continents' || selectedContinent === cardContinent) && 
          (selectedCategory === 'All Categories' || selectedCategory === cardCategory)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
  

  $(document).ready(function() {
    // Call filterCards() whenever the user selects a continent or category
    $('#selectContinent, #selectCategory').on('change', function() {
      filterCards();
    });
  
    // Display all cards by default
    filterCards();
  });