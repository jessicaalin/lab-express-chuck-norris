const express = require('express');
const app = express();
const Chuck  = require('chucknorris-io');
const client = new Chuck();
const layouts = require("express-ejs-layouts");
app.set("view engine", "ejs"); //this is like doing a require

app.use(express.static("public"));

app.use(layouts);

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/random", (req, res, next) => {

  client.getRandomJoke()
    .then((response) => {
      // "response" contains the joke data
      console.log("Joke Data: ", response);
      res.locals.joke = response.value;
      // save "response.value" as a local EJS variable
      // render a view to display the joke
      res.render("random");
    })
    .catch((err) => {
      // this will get called only if there's an error
      console.log("Joke ERROR: ", err);
      // render an error view
      res.render("error");
    });
}); // get random

// app.get("/categories", (req, res, next) => {
//
//   client.getJokeCategories()
//     .then((response)=>  {
//       // use the response here
//     })
//     .catch((err)=> {
//       // handle error
//     });
// });

app.listen(3000);
