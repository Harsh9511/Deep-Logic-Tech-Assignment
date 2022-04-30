const express = require('express');
const request = require('request');

const app = express();


// *IMPORTANT*: Copy this link "http://localhost:8080/getTimeStories" and paste it to the browser's search bar and observe the desired output.
app.get('/getTimeStories', (req, res) => {
    let result_data = [];
    request.get('https://time.com', function (err, response, body) {

        // String manipulation (All steps are documented and explained below.)
        // Slicing the extra content from the string which is not required.
        // Splitting the text based on the "<li>" tag and storing individual items inside "latestStories" array.
        let latestStories = body.slice(body.indexOf("latest-stories"), body.lastIndexOf("latest-stories__item-timestamp")).split("</li>");

        // Looping through the "latesStories" array.
        for (let i = 0; i < latestStories.length; i++) {
            // Slicing the text between the href and h3 which will be our link.
            let link_text = latestStories[i].slice(latestStories[i].indexOf("href="), latestStories[i].indexOf("<h3"));

            // Slicing out the extra space and concatinating the "https://time.com" in starting of the link.
            let link = "https://time.com" + link_text.substring(6, link_text.length - 19);

            // Slicing the text between the "<h3>....</h3>" tag which will be our title.
            let title_text = latestStories[i].slice(latestStories[i].indexOf("<h3"), latestStories[i].indexOf("</h3>")).substring(42);

            // Replacing the extra tag with nothing.
            let title = title_text.replace(/<i>/g, "").replace(/<[/]i>/g, "").replace(/<em>/g, "").replace(/<[/]em>/g, "");


            // Pushing each story data in an array.
            result_data.push({ link: link, title: title });
        }


        // Printing the result on console
        console.log(result_data);

        // Sending the same result as a response also.
        res.send(result_data);

    });
});

app.listen(8080, () => {
    console.log("Connected to PORT: 8080");
})