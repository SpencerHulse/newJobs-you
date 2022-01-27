//Element selecters
var zipCode=$(".zip-code");
var jobsBtn=$(".jobs-btn");
var previousPage=$("#previous-page");
var nextPage=$("#next-page");

var fetchJobs = (event) => {
    event.preventDefault();
    var enteredZip = zipCode.val();
   
}


//eventlisteners
jobsBtn.on("click",fetchJobs)
