document
  .getElementById("get-all-characters")
  .addEventListener("click", getAllCharacters);
document
  .getElementById("filter-characters")
  .addEventListener("click", filterCharacters);

function getAllCharacters() {
  fetch("https://rickandmortyapi.com/api/character")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCharacters(data.results);
    })
    .catch(function (error) {
      showError("Failed to fetch characters");
    });
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
      displayCharacters(data.results);
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
      "</p>";
    characterList.appendChild(characterDiv);
  });
}

function showError(message) {
  var errorMessage = document.getElementById("error-message");
  errorMessage.textContent = message;
}
