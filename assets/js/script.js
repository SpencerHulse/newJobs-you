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
    var zipApi= "http://ziptasticapi.com/" + currentZip;
    fetch(zipApi).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data)
            })
        }
    })
}



//eventlisteners
jobsBtn.on("click",jobsHandler)
