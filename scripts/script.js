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

$(document).ready(function () {
    var places = [
        // array of objects with properties for each tourist site
    ];
    // populate the cards based on the places array
    // ...
    // event listener for when the continent filter option changes
    $('#continent-filter').change(function () {
        var selectedContinent = $(this).val();
        // loop through each card and hide/show based on the selected continent
        $('.card').each(function () {
            var cardContinent = $(this).find('.continent').text();
            if (selectedContinent === "" || cardContinent === selectedContinent) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
});