let data;

fetch("./data.json").then(response => response.json()).then(products => { data = products });

var inputElement = document.getElementById("searchbox");

inputElement.addEventListener('keyup', function (event) {
    let value = inputElement.value;

    loadSearches(data, value);
});

function loadSearches(products, value) {
    let cars = products['cars'];
    let bikes = products['bikes'];
    let vehicles = cars.concat(bikes);

    let carMatches = [];
    let bikeMatches = [];

    for (let i = 0; i < cars.length; i++) {
        if (cars[i]["name"].toLowerCase().includes(value.toLowerCase())) {
            carMatches.push(cars[i]);
        }
    }

    for (let i = 0; i < bikes.length; i++) {
        if (bikes[i]["name"].toLowerCase().includes(value.toLowerCase())) {
            bikeMatches.push(bikes[i]);
        }
    }

    var dropdown = document.getElementById("dropstop");

    dropdown.innerHTML = ``;

    if (value == "") {
        return;
    }

    for (let i = 0; i < carMatches.length; i++) {
        dropdown.innerHTML += `
        <a class="item" href="./cars.html#${carMatches[i]["productId"]}">${carMatches[i]["name"]}</a>
        `
    }

    for (let i = 0; i < bikeMatches.length; i++) {
        dropdown.innerHTML += `
        <a class="item" href="./bike.html#${bikeMatches[i]["productId"]}">${bikeMatches[i]["name"]}</a>
        `
    }

}