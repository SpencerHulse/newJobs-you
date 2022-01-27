//element selectors
var zipCode = $(".zip-code");
var jobsBtn = $(".jobs-btn");
var previousPage = $("#previous-page");
var nextPage = $("#next-page");

//global variables
var currentZip = "";
var currentCity = "";
var currentState = "";
var page = 1;

//jobs handler for clicking search button
var jobsHandler = (event) => {
  event.preventDefault();
  currentZip = zipCode.val();
  fetchLocation();
};

//fetches zip API information
var fetchLocation = () => {
  var zipAPI = "http://ziptasticapi.com/" + currentZip;
  fetch(zipAPI)
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        //handles capitalizing the first letter of each part of the city name
        var cityArr = data.city.split(" ");
        for (var i = 0; i < cityArr.length; i++) {
          cityArr[i] = cityArr[i].charAt(0) + cityArr[i].toLowerCase().slice(1);
        }
        currentCity = cityArr.join(" ");
        currentState = data.state;
        fetchJobs();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

//function for getting job information
var fetchJobs = () => {
  var museAPI = `https://www.themuse.com/api/public/jobs?category=Software%20Engineer&location=${currentCity}%2C%20${currentState}&page=${page}`;
  fetch(museAPI).then(function (response) {
    response
      .json()
      .then(function (data) {
        console.log(data.results);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
};

//function to go to the previous page (if applicable)
function previousPg() {
  if (page === 1) {
    return;
  } else {
    page--;
    fetchJobs();
  }
}

//function to go to the next page
function nextPg() {
  page++;
  fetchJobs();
}

//eventlisteners
jobsBtn.on("click", jobsHandler);
previousPage.on("click", previousPg);
nextPage.on("click", nextPg);
