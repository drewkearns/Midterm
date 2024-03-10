fetch("./data.json").then(response => response.json()).then(myData => loadPage(myData));

function loadPage(myData) {

  loadCarousel(myData);

  let bikes = myData["bikes"];

  var mainContainer = document.getElementById("productsection");

  let index = 0;

  for (let bike of bikes) {

    let name = bike["name"];
    let description = bike["description"];
    let url = bike["imgUrl"];
    let productId = bike["productId"];
    let maker = bike["maker"];
    let releaseYear = bike["releaseYear"];
    let avgMPG = bike["avgMPG"];
    let topSpeed = bike["topSpeed"];

    let div = document.createElement("div");
    div.id = "" + productId;

    if (index % 2 == 1) {
      div.innerHTML = `
            <div class="row featurette">
              <div class="col-md-7">
                <h2 style="color:red;" class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2>
                <p class="lead">${description}</p>
                <ul>Specs:
                  <li>${maker}</li>
                  <li>${releaseYear}</li>
                  <li>${avgMPG}</li>
                  <li>${topSpeed}</li>
                </ul>
              </div>
              <div class="col-md-5">
                <img width="500px" src="${url}" alt="${name}">
              </div>
            </div>

            <hr class="featurette-divider">
            `
    } else {
      div.innerHTML = `
            <div class="row featurette">
              <div class="col-md-7 order-md-2">
                <h2 style="color:blue;" class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2>
                <p class="lead">${description}</p>
                <ul>Specs:
                  <li>${maker}</li>
                  <li>${releaseYear}</li>
                  <li>${avgMPG}</li>
                  <li>${topSpeed}</li>
                </ul>
              </div>
              <div class="col-md-5 order-md-1">
                <img width="500px" src="${url}" alt="${name}">
              </div>
            </div>
        
            <hr class="featurette-divider">
            `
    }

    mainContainer.appendChild(div);

    index++;
  }

}

function loadCarousel(myData) {
  var carouselContainer = document.getElementById("carouselProducts");
  var buttonContainer = document.getElementById("carousel_buttons");

  let div = document.createElement("div");

  let carousel_string = "";

  let index = 0;
  let ind = 0;
  let filler = "";

  for (let bike of myData["bikes"]) {
    let button = document.createElement("button");

    button.setAttribute("type", "button");
    button.setAttribute("data-bs-target", "\"#myCarousel\"");
    button.setAttribute("data-bs-slide-to", `${ind}`);
    if (ind == 0) {
      button.setAttribute("class", "active");
      button.setAttribute("aria-current", "true");
    }
    button.setAttribute("aria-label", `Slide ${ind + 1}`);
    ind++;

    buttonContainer.appendChild(button);
  }

  for (let bike of myData["bikes"]) {
    let name = bike["name"];
    let url = bike["imgUrl"];
    let prodUrl = bike["prodUrl"];
    if (index == 0) {
      filler = " active";
    } else {
      filler = "";
    }
    carousel_string += `
        <div class="carousel-item${filler}">
        <div class="image_container">
          <img class="carousel_background" src="${url}" alt="${name}"></img>
          <img class="carousel_image" src="${url}" alt="${name}">
        </div>
        <div class="container">
          <div class="carousel-caption">
            <h1 class="carousel_text">${name}</h1>
            <p><a class="btn btn-lg btn-primary" href=${prodUrl} target="_blank">Buy Now</a></p>
          </div>
        </div>
      </div>
        `
    index++;

    div.innerHTML = carousel_string;

    carouselContainer.appendChild(div);
  }
}