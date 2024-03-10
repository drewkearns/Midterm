fetch("./data.json").then(response => response.json()).then(myData => loadPage(myData));

function loadPage(myData) {
  let cars = myData["cars"];

  loadCarousel(myData);

  var mainContainer = document.getElementById("productsection");

  let index = 0;

  for (let car of cars) {

    let name = car["name"];
    let description = car["description"];
    let url = car["imgUrl"];
    let productId = car["productId"];
    let maker = car["maker"];
    let releaseYear = car["releaseYear"];
    let avgMPG = car["avgMPG"];
    let topSpeed = car["topSpeed"];

    let div = document.createElement("div");
    div.id = "" + productId;

    if (index % 2 == 1) {
      div.innerHTML = `
            <div class="row featurette">
              <div class="col-md-7">
                <h2 class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2>
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
                <h2 class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2>
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

  function loadCarousel(myData) {
    var carouselContainer = document.getElementById("carouselProducts");
    var buttonContainer = document.getElementById("carousel_buttons");

    let div = document.createElement("div");

    let carousel_string = "";

    let index = 0;
    let ind = 0;
    let filler = "";

    for (let car of myData["cars"]) {
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

    for (let car of myData["cars"]) {
      let name = car["name"];
      let url = car["imgUrl"];
      let prodUrl = car["prodUrl"];
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
}