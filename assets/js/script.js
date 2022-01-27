//Element selecters
var zipCode=$(".zip-code");
var jobsBtn=$(".jobs-btn");
var previousPage=$("#previous-page");
var nextPage=$("#next-page");

//global variables
var currentZip = "";
var currentCity = "";
var currentState ="";


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
}

//eventlisteners
jobsBtn.on("click",jobsHandler)
