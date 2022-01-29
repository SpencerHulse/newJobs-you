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
  //prevents page from refreshing upon submit
  event.preventDefault();

  //gets the value entered into the zip code input
  currentZip = zipCode.val();
  console.log(currentZip);
  //if the value does not have a length of five, it does not proceed
  if (currentZip.length !== 5) {
    //Not a valid Zip Code!
    return;
  }

  //fetches the location using the five character input
  fetchLocation();
};

//fetches zip API information
var fetchLocation = () => {
  //plugs the zip code into the api
  var zipAPI = "http://ziptasticapi.com/" + currentZip;

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
    fetchJobs();
  }
}

//function to go to the next page
function nextPg() {
  page++;
  fetchJobs();
}

//event listeners
jobsBtn.on("click", jobsHandler);
previousPage.on("click", previousPg);
nextPage.on("click", nextPg);

function createJobCards(jobsArray) {
  console.log(jobsArray);
  jobsArray.forEach(function (job, index) {
    console.log(job, index);

    var jobItem = $("<div>")
      .addClass("card job-card")
      .attr("id", index)
      .appendTo($(".cards-container"));

    var cardContent = $("<div>").addClass("card-content white-text");

    var cardTitle = $("<span>")
      .addClass("card-title activator")
      .text("Job Title");

    var cardText = $("<p>").text("Company Name");

    var cardReveal = $("<div>").addClass("card-reveal");

    var revealSpan = $("<span>")
      .addClass("card-title")
      .html("Reveal Title <i class='material-icons right'>close</i>");

    var revealText = $("<p>").text(job);

    cardContent.append(cardTitle, cardText);
    cardReveal.append(revealSpan, revealText);
    jobItem.append(cardContent, cardReveal);
  });
}
