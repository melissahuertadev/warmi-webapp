const express = require("express");
const request = require("request");
const https = require("https");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

require("dotenv").config();

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/suscribe", (req, res) => {
  const { email, js } = req.body;

  const mcData = {
    members: [
      {
        email_address: email,
        status: "pending",
      },
    ],
  };

  const mcDataPost = JSON.stringify(mcData);

  const url = "https://us14.api.mailchimp.com/3.0/lists/d4bbc95c1e";
  const options = {
    method: "POST",
    auth: process.env.MC_API_KEY,
  };

  if (email) {
    const httprequest = https.request(url, options, function(response){

        if (js) {
            res.sendStatus(200);
        } else {
            res.redirect("/success.html");
        }
    
        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    });

    httprequest.write(mcDataPost);
    httprequest.end();
  } else {
    res.status(404).send({ message: "Failed" });
  }
  
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server running on port " + PORT));
