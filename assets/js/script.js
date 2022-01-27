//Element selecters
var zipCode=$(".zip-code");
var jobsBtn=$(".jobs-btn");
var previousPage=$("#previous-page");
var nextPage=$("#next-page");

//global variables
var currentZip = "";
var currentCity = "";
var currentState ="";
var page =1;

var jobsHandler = (event) => {
    event.preventDefault();
    currentZip = zipCode.val();
    fetchLocation();
   
}
var fetchLocation= () => {
    var zipAPI = "http://ziptasticapi.com/" + currentZip;
    fetch(zipAPI).then(function(response){
            response.json().then(function(data){
                console.log(data)
                var cityArr = data.city.split(" ");
                for (var i = 0; i < cityArr.length; i++) {
                    cityArr[i] = cityArr[i].charAt(0) + cityArr[i].toLowerCase().slice(1);
                }
                currentCity = cityArr.join(" ");
                currentState = data.state;
                fetchJobs();
            })
    }).catch(function(error){
        console.log(error)
    })
}

var fetchJobs = () => {
    var museAPI = `https://www.themuse.com/api/public/jobs?category=Software%20Engineer&location=${currentCity}%2C%20${currentState}&page=${page}`
    fetch(museAPI).then(function (response) {
        response.json().then(function (data) {
            console.log(data.results);
        }).catch(function (error) {
            console.log(error);
        })
    })
}

//eventlisteners
jobsBtn.on("click",jobsHandler)
