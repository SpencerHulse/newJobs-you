//Element selecters
var zipCode=$(".zip-code");
var jobsBtn=$(".jobs-btn");
var previousPage=$("#previous-page");
var nextPage=$("#next-page");

//global variables
var currentZip = "";

var jobsHandler = (event) => {
    event.preventDefault();
    currentZip = zipCode.val();
    fetchLocation();
   
}
var fetchLocation= () => {
    console.log(currentZip)
}

//eventlisteners
jobsBtn.on("click",jobsHandler)
