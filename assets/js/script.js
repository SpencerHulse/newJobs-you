//element selectors
var zipCode = $(".zip-code");
var mainZipCode = $(".main-zip-code");
var jobsBtn = $(".jobs-btn");
var previousPage = $("#previous-page");
var nextPage = $("#next-page");
var cardContainer = $(".cards-container");

//global variables
var currentZip = "";
var currentCity = "";
var currentState = "";
var page = 1;

//jobs handler for clicking search button
var jobsHandler = (event) => {
  //prevents page from refreshing upon submit
  event.preventDefault();

  //gets the value entered into the zip code input
  currentZip = zipCode.val();
  //if the value does not have a length of five, it does not proceed
  if (currentZip.length !== 5) {
    //FEATURE: potentially make this response a modal to tell people why it did not work
    console.log("Not a valid Zip Code!");
    return;
  }

  //saves searched zip code
  saveZipCode();

  //changes location if on landing page
  if ($(event.target).hasClass("jobs-btn-lp")) {
    window.location = "./index.html";
  }

  //fetches the location using the five character input
  fetchLocation();
};

//fetches zip API information
var fetchLocation = () => {
  //plugs the zip code into the api
  var zipAPI = "https://ziptasticapi.com/" + currentZip;

  //places the zip code searched into the zip code input on main page
  mainZipCode.val(currentZip);
  
  //sends a fetch request
  fetch(zipAPI)
    .then(function (response) {
      //if the response is successful, it gets the data from the response
      response.json().then(function (data) {
        //if there is no error, data is logged (city and state)
        if (!data.error) {
          console.log(data);
          //breaks the returned city name into an array
          var cityArr = data.city.split(" ");
          //capitalizes the first letter of each part of the city name
          for (var i = 0; i < cityArr.length; i++) {
            cityArr[i] =
              cityArr[i].charAt(0) + cityArr[i].toLowerCase().slice(1);
          }
          //joins the parts of the city name and stores it
          currentCity = cityArr.join(" ");
          //stores state abbreviation
          currentState = data.state;

          //launches the fetch jobs function
          fetchJobs();
        } else {
          //FEATURE: potentially make this response a modal to tell people why it did not work
          console.log(data.error);
        }
      });
    })
    .catch(function (error) {
      //FEATURE: potentially make this response a modal to tell people why it did not work
      console.log(error);
    });
};

//function for getting job information
var fetchJobs = () => {
  //plugs in the city, state, and page into the api
  var museAPI = `https://www.themuse.com/api/public/jobs?category=Software%20Engineer&location=${currentCity}%2C%20${currentState}&page=${page}`;

  //fetches data from the api
  fetch(museAPI).then(function (response) {
    response
      .json()
      .then(function (data) {
        createJobCards(data.results);
      })
      .catch(function (error) {
        //FEATURE: potentially make this response a modal to tell people why it did not work
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
    cardContainer.empty();
    fetchJobs();
  }
}

//function to go to the next page
function nextPg() {
  page++;
  cardContainer.empty();
  fetchJobs();
}

function saveZipCode() {
  //saves searched zip code
  localStorage.setItem("zip", JSON.stringify(currentZip));
}

function loadZipCode() {
  //returns the data from its stringified version
  currentZip = JSON.parse(localStorage.getItem("zip"));

  //if there is nothing in localstorage, it stops here
  if (!currentZip) {
    //starts with a clean variable
    currentZip = "";
    return;
  }

  fetchLocation();
}

//event listeners
jobsBtn.on("click", jobsHandler);
previousPage.on("click", previousPg);
nextPage.on("click", nextPg);

function createJobCards(jobsArray) {
  $('.cards-container').html('');
  
  jobsArray.forEach(function (job, index) {
    var locationsArray = [];
    var jobItem = $("<div>")
      .addClass("job-card card col s5")
      .attr("id", index)
      .appendTo(cardContainer);

    var cardContent = $("<div>").addClass("card-content");

    var cardTitle = $("<span>")
      .addClass("card-title activator")
      .text(job.company.name);

    var cardText = $("<p>").text(job.name);
    var cardReveal = $("<div>").addClass("card-reveal");

    var revealTitle = $("<span>")
      .addClass("card-title")
      .html(job.name + "<i class='material-icons right'>close</i>");

    var dl = $("<dl>");
    var dt = $("<dt>").text('Locations');
    job.locations.forEach(function(currentValue) {
      var dd = $('<dd>').text('- ' + currentValue.name);
      dt.append(dd);
    })

    var cardExperience = $("<p>").text(job.levels[0].name);

    var revealLink = $("<a>")
      .attr("href", job.refs.landing_page)
      .attr("target", "_blank")
      .text("Muse Page");

    cardContent.append(cardTitle, cardText);
    cardReveal.append(revealTitle, revealLink, cardExperience, dl);
    dl.append(dt);
    jobItem.append(cardContent, cardReveal);
  });
}

$("#jobs-page-image").on("click", function() {
  window.location = "./landingpage.html";
})

loadZipCode();
