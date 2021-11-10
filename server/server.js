/*
 * Disclaimer:
 * This app demonstrates how to make an authenticated API with password protected users.
 * This app DOES NOT demonstrate best practices but only how to use the individual libraries.
 * Use the code below at your own discretion. Read the comments!
 */

// Libraries
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const checkJwt = require("express-jwt"); // Validates access tokens automatically

// Configuration
const port = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan("combined")); // Log all requests to the console


mongoose.connect("mongodb+srv://frankild:pc8307pc@artwalkkonzept.rnrwp.mongodb.net/Test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})

//data schema and model
const artwalkSchema = {
  name: String,
  bilds: String
}

const Artwalk = mongoose.model("Artwalk", artwalkSchema);

//API routes
app.get('/artwalks', function(req, res) {
  Artwalk.find().then(artwalks => res.json(artwalks));
})

//add artwalk
app.post('/newartwalk', function(req, res) {
  const name = req.body.name;
  const bilds = req.body.bilds;

  const newArtwalk = new Artwalk({
      name,
      bilds
  });

  newArtwalk.save();

});

app.delete('/delete/:id', function(req, res) {
  const id = req.params.id;
  Artwalk.findByIdAndDelete({_id: id}, function(err) {
      if(!err) {
          console.log("artwalk deleted");
      } else {
          console.log(err);
      }
  })
});

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Open paths that do not need login.
// You can use various formats to define the open paths.
const openPaths = [
  // Open "/api/users/authenticate" for POST requests
  { url: "/api/users/authenticate", methods: ["POST"] },

  // Open everything that doesn't begin with "/api"
  /^(?!\/api).*/gim,

  // Open all GET requests on the form "/api/questions/*" using a regular expression
  { url: /\/api\/questions\.*/gim, methods: ["GET"] }
];

// The secret value. Defaults to "the cake is a lie".
const secret = process.env.SECRET || "Don't make lies";

// Validate the user token using checkJwt middleware.
app.use(checkJwt({ secret, algorithms: ['HS512'] }).unless({ path: openPaths }));

// This middleware checks the result of checkJwt above
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") { // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, forward request to next middleware or route handler
  }
});

// Some test data
const data = [
  { id: 1, name: "Tour", bilds: [" API-tour ", " 123 "] },
];

// The routes
const usersRouter = require("./routers/usersRouter")(secret);
const artwalkRouter = require("./routers/ArtwalkRouter")(data);
app.use("/api/users", usersRouter);
app.use("/api/artwalks", artwalkRouter);

// Start
//app.listen(port, () => console.log(`Auth Artwalks API running on port ${port}!`));
app.listen(port, function() {
  console.log( `express and Auth Artwalks API is running on port ${port}!`);
})
