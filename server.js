// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();
const Joi = require("joi");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require("cors");
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + "/views/index.html");
});


app.get("/api/:date?", async (req, res) => {
	const {params} = req;
	if(params.date) {
		try {
			const validated = await Joi.date().validateAsync(params.date);
			const d = new Date(validated);
			return res.json({
				unix: d.getTime(),
				utc: d.toUTCString()
			});
		} catch(e) {
			return res.json({
				error: "Invalid Date"
			});
		}
	} else {
		const d = new Date();
		return res.json({
			unix: d.getTime(),
			utc: d.toUTCString()
		});
	}
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
	res.json({greeting: "hello API"});
});



// listen for requests :)
var listener = app.listen(3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
