fetch("./data.json").then(response => response.json()).then(myData => loadPage(myData));

function loadPage(myData) {
  let bikes = myData["bikes"];
  let cars = myData["cars"];

  let products = joinLists(bikes, cars);

  loadCarousel(products);

  loadProducts(products, myData);
}

function joinLists(list1, list2) {

  let newList = [];

  for (let i = 0; i < list1.length + list2.length; i++) {
    if (i > list1.length - 1) {
      for (let j = i; j < list2.length; j++) {
        newList.push(list2[j]);
      }
    } else if (i > list2.length - 1) {
      for (let j = i; j < list1.length; j++) {
        newList.push(list1[j]);
      }
    } else {
      newList.push(list1[i]);
      newList.push(list2[i]);
    }
  }

  return newList;
}

function loadCarousel(products) {

  var buttonContainer = document.getElementById("carousel_buttons");

  for (let i = 0; i < products.length; i++) {
    let button = document.createElement("button");

    button.setAttribute("type", "button");
    button.setAttribute("data-bs-target", `"#myCarousel"`);
    button.setAttribute("data-bs-slide-to", `${i}`);
    if (i == 0) {
      button.setAttribute("class", "active");
      button.setAttribute("aria-current", "true");
    }
    button.setAttribute("aria-label", `Slide ${i + 1}`);

    buttonContainer.appendChild(button);
  }

  var carouselContainer = document.getElementById("carouselProducts");

  let index = 0;

  let filler = "";

  let carousel_string = "";

  let div = document.createElement("div");

  for (let product of products) {
    let name = product["name"];
    let url = product["imgUrl"];
    let prodUrl = product["prodUrl"];
    if (index == 0) {
      filler = " active";
    } else {
      filler = "";
    }
    carousel_string += `
        <div class="carousel-item${filler}">
        <div class="image_container">
          <img class="carousel_background" src="${url}" alt="${name}"></img>
          <img class="carousel_image" src="${url}" alt="${name}"></img>
        </div>
        <div class="container">
          <div class="carousel-caption">
            <h1 class="carousel_text">${name}</h1>
            <p><a class="btn btn-lg btn-primary" href="${prodUrl}" target="_blank">Buy Now</a></p>
          </div>
        </div>
      </div>
        `

    div.innerHTML = carousel_string;

    carouselContainer.appendChild(div);

    index++;
  }
}

function loadProducts(products, myData) {
  var mainContainer = document.getElementById("productsection");

  let bikes = myData["bikes"];
  let cars = myData["cars"];
  let index = 0;

  for (let product of products) {
    let name = product["name"];
    let description = product["description"];
    let url = product["imgUrl"];
    let productId = product["productId"];
    let goto = "";

    let div = document.createElement("div");
    div.id = "" + productId;

    for (let bike of bikes) {
      let bike_name = bike["name"];
      if (bike_name === name) {
        goto = "bike";
      }
    }

    for (let car of cars) {
      let car_name = car["name"];
      if (car_name === name) {
        goto = "cars";

      }
    }

    if (index % 2 == 1) {
      div.innerHTML = `
            <div class="row featurette">
              <div class="col-md-7">
                <a class="item" href="./${goto}.html#${productId}" style="color:red"><h2 style="color:red;" class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2></a>
                <p class="lead">${description}</p>
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
                <a class="item" href="./${goto}.html#${productId}" style="color:red"><h2 style="color:blue;" class="featurette-heading vehicle-title fw-normal lh-1">${name}</h2></a>
                <p class="lead">${description}</p>
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