const testArray = ['1', '2', '3', '4', '5'];

function createJobCards(jobsArray) {
    jobsArray.forEach(function(job, index) {
        console.log(job, index);

        var jobItem = $("<div>")
        .addClass("card job-card")
        .attr("id", index);

        var cardContent = $("<div>")
        .addClass("card-content white-text");

        var cardTitle = $("<span>")
        .addClass("card-title")
        .text("Job Title");

        var cardText = $("<p>")
        .text("Company Name", job);

        var cardAction = $("<div>")
        .addClass("card-action");

        var link = $("<a>")
        .attr("href", "#")
        .text("This is a link");

        cardContent.append(cardTitle, cardText);
        cardAction.append(link);
        jobItem.append(cardContent, cardAction);
        $(".cards-container").append(jobItem);

    })
}

createJobCards(testArray);