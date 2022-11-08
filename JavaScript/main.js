var siteNameInput = document.getElementById("Sitename");
var siteUrlInput = document.getElementById("SiteUrl");
var addSubmit = document.getElementById("submit");
var sites = [];
var inputs = document.getElementsByClassName("form-control");
var searchInput = document.getElementById("search");
var updateIndex = 0;

if (JSON.parse(localStorage.getItem("siteLists")) != null) {
  sites = JSON.parse(localStorage.getItem("siteLists"));
  displaySite();
}
addSubmit.onclick = function () {
  if (addSubmit.innerHTML == "Submit") {
    addSite();
  } else {
    updateSite();
  }
  displaySite();
  clearData();
};
function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  sites.push(site);
  localStorage.setItem("siteLists", JSON.stringify(sites));
}
function displaySite() {
  var box = "";
  for (var i = 0; i < sites.length; i++) {
    box += `<div class='webwell d-flex mt-5 p-4'>
                <h2>${sites[i].name}</h2>
                <a class='btn btn-primary' href='${sites[i].url}' target='_blank'>Visit</a>
                <button onclick='deleteSite(${i})' class='btn btn-danger'>Delete</button>
                <button onclick='getSiteData(${i})' class='btn btn-warning'>Update</button>
                </div>`;
  }
  document.getElementById("bookmarkList").innerHTML = box;
}
function deleteSite(index) {
  sites.splice(index, 1);
  localStorage.setItem("siteLists", JSON.stringify(sites));
  displaySite();
}
function clearData() {
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}
searchInput.onkeyup = function () {
  var box = "";
  for (var i = 0; i < sites.length; i++) {
    if (sites[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
      box += `<div class='webwell d-flex mt-5 p-4'>
                <h2>${sites[i].name}</h2>
                <a class='btn btn-primary' href='${sites[i].url}' target='_blank'>Visit</a>
                <button onclick='deleteSite(${i})' class='btn btn-danger'>Delete</button>
                <button onclick='getSiteData(${i})' class='btn btn-warning'>Update</button>
                </div>`;
  }
  document.getElementById("bookmarkList").innerHTML = box;
};
function getSiteData(index) {
  updateIndex = index;
  var currentSite = sites[index];
  siteNameInput.value = currentSite.name;
  siteUrlInput.value = currentSite.url;
  addSubmit.innerHTML = "Update Site";
}
function updateSite() {
  var site = {
    name: siteNameInput.value,
    url: siteUrlInput.value,
  };
  sites[updateIndex] = site;
  addSubmit.innerHTML = "Submit";
  localStorage.setItem("siteLists", JSON.stringify(sites));
}
siteNameInput.onkeyup = function () {
  var nameRejex = /^[A-Z][a-z]{3,15}$/;
  var nameValid = document.getElementById("nameAlert");
  if (nameRejex.test(siteNameInput.value)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    nameValid.classList.add("d-none");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    nameValid.classList.remove("d-none");
  }
};
siteUrlInput.onkeyup = function () {
  var urlRejex =
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  var urlValid = document.getElementById("urlAlert");
  if (urlRejex.test(siteUrlInput.value)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    urlValid.classList.add("d-none");
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    urlValid.classList.remove("d-none");
  }
};
