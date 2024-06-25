document
  .getElementById("get-all-characters")
  .addEventListener("click", function () {
    getAllCharacters(1);
  });
document
  .getElementById("filter-characters")
  .addEventListener("click", filterCharacters);

function getAllCharacters(page) {
  fetch("https://rickandmortyapi.com/api/character?page=" + page)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      clearError();
      displayCharacters(data.results);
      setupPagination(data.info, page);
    })
    .catch(function (error) {
      showError("Failed to fetch characters");
    });
}

function setupPagination(info, currentPage) {
  var pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  for (var i = 1; i <= info.pages; i++) {
    var pageButton = document.createElement("button");
    pageButton.textContent = i;
    if (i == currentPage) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", function () {
      getAllCharacters(this.textContent);
    });
    pagination.appendChild(pageButton);
  }
}

function filterCharacters() {
  var name = document.getElementById("name").value;
  var status = document.getElementById("status").value;
  var species = document.getElementById("species").value;
  var type = document.getElementById("type").value;
  var gender = document.getElementById("gender").value;

  var url =
    "https://rickandmortyapi.com/api/character/?name=" +
    encodeURIComponent(name) +
    "&status=" +
    encodeURIComponent(status) +
    "&species=" +
    encodeURIComponent(species) +
    "&type=" +
    encodeURIComponent(type) +
    "&gender=" +
    encodeURIComponent(gender);

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      clearError();
      displayCharacters(data.results);
      setupPagination(data.info, 1);
    })
    .catch(function (error) {
      showError("Failed to fetch characters with the given filters");
    });
}

function displayCharacters(characters) {
  var characterList = document.getElementById("character-list");
  characterList.innerHTML = "";
  characters.forEach(function (character) {
    var characterDiv = document.createElement("div");
    characterDiv.className = "character";
    characterDiv.innerHTML =
      '<img src="' +
      character.image +
      '" alt="' +
      character.name +
      '">' +
      "<h3>" +
      character.name +
      "</h3>" +
      "<p>Status: " +
      character.status +
      "</p>" +
      "<p>Species: " +
      character.species +
      "</p>" +
      "<p>Type: " +
      character.type +
      "</p>" +
      "<p>Gender: " +
      character.gender +
      "</p>" +
      '<button onclick="toggleDetails(this)">Show More</button>' +
      '<div class="extra-details" style="display: none;">' +
      "<p>Origin: " +
      character.origin.name +
      "</p>" +
      "<p>Location: " +
      character.location.name +
      "</p>" +
      "<p>Episodes: " +
      character.episode.length +
      "</p>" +
      "</div>";
    characterList.appendChild(characterDiv);
  });
}

function toggleDetails(button) {
  var extraDetails = button.nextElementSibling;
  if (extraDetails.style.display === "none") {
    extraDetails.style.display = "block";
    button.textContent = "Show Less";
  } else {
    extraDetails.style.display = "none";
    button.textContent = "Show More";
  }
}

function showError(message) {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
}

function clearError() {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = "";
}
