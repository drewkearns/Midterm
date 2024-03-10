fetch("./data.json").then(response => response.json()).then(myData => loadPage(myData));

function loadPage(myData) {
    let students = myData["people"];

    var mainContainer = document.getElementById("studentInfo");

    let index = 1;

    for (let student of students) {

        let name = student["name"];
        let email = student["email"];
        let description = student["description"];
        let url = student["imgUrl"];

        let div = document.createElement("div");
        div.className = "col-md-6";

        let textEmph = "primary";

        if (index === 2) {
            textEmph = "success";
        }

        div.innerHTML = `
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-${textEmph}-emphasis">Student ${index}</strong>
            <h3 class="mb-0">${name}</h3>
            <div class="mb-1 text-body-secondary">Feb 26, 2024</div>
            <p class="card-text mb-auto">Email: <a class="hoverEmail" href="mailto: ${email}">${email}</a></p>
            <p class="mb-auto">${description}</p>
          </div>
          <div class="col-auto d-none d-lg-block">
            <img width="200" height="250" src="${url}" aria-label="${name}" preserveAspectRatio="xMidYMid slice" focusable="false" alt="${name}"><title>${name}</title>
          </div>
        </div>
        `;
        index++;
        mainContainer.appendChild(div);
    }
}