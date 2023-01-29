const express = require('express');
const fs = require("fs");
var bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

app.get('/getUsers', (req, res) => {
	
	fs.readFile("./users.json", "utf8", (err, jsonString) => {
		if (err) {
			console.log(err);
			return;
		}
		res.send(jsonString)
	});
});

app.post('/', (req, res) => {
	

	var fileName = "users_data/"+req.body.web_address+".txt";


	var writeStream = fs.createWriteStream(fileName);
	writeStream.write(JSON.stringify(req.body));
	writeStream.end();

	fs.readFile("./users.json", "utf8", (err, jsonString) => {
		if (err) {
			console.log(err);
			return;
		}
		var users_data = JSON.parse(jsonString);
		users_data.push(req.body.web_address);

		var writeStreamUsers = fs.createWriteStream("./users.json");
		writeStreamUsers.write(JSON.stringify(users_data));
		writeStreamUsers.end();

	});

    res.send("success");
});

app.get('/card.html', express.static('public/card.html'))


app.get('/:contact_name', function(req, res) {

	var fileName = "users_data/"+req.params.contact_name+".txt";
	fs.readFile(fileName, "utf8", (err, jsonString) => {
		if (err) {
			console.log(err);
			return;
		}
		var users_data = JSON.parse(jsonString);
		res.render('card.ejs', users_data);

	});

});


