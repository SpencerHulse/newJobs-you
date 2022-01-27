const testArray = ['1', '2', '3', '4', '5'];

function createJobCards(jobsArray) {
    jobsArray.forEach(function(job, index) {
        console.log(job, index);

        var jobItem = $("<div>")
        .addClass("card job-card")
        .attr("id", index)
        .appendTo($(".cards-container"));

        var cardContent = $("<div>")
        .addClass("card-content white-text");

        var cardTitle = $("<span>")
        .addClass("card-title activator")
        .text("Job Title");

        var cardText = $("<p>")
        .text("Company Name");

        var cardReveal = $("<div>")
        .addClass("card-reveal");

        var revealSpan = $("<span>")
        .addClass("card-title")
        .html("Reveal Title <i class='material-icons right'>close</i>");

        var revealText = $("<p>")
        .text(job);

        cardContent.append(cardTitle, cardText);
        cardReveal.append(revealSpan, revealText);
        jobItem.append(cardContent, cardReveal);
       

    })
}

createJobCards(testArray);