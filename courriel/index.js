//chargement du module serveur http
var express = require('express'); 
var app = express();

//chargement du module pour l'authentification
var basicAuth = require('basic-auth'); 

var bodyParser = require('body-parser');
app.use(bodyParser());

 //repertoires pour les fichiers statiques comme les fichiers css
app.use(express.static(__dirname + '/public'));

//utiliser jade comme template engine  pour express
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');


//chargement du module système de fichiers
var fs = require("fs");
var etat = {};

fs.readFile('./data/etat.json', 'utf8', function (err, data) {
	if (err) {
		throw err;
	}
	//console.log(data);
	etat = JSON.parse(data);
});


//chargement du module pour la cryptographie
var crypto = require('crypto');

var ALGORITHM = 'aes256'; // or any other algorithm supported by OpenSSL
var KEY = 'Pa$$w0rd'; //crypto.randomBytes(32); // This key should be stored in an environment variable
//console.log(KEY);

var authors = 'Aline Landry, Ariella Sota, Arnaud Niyonkuru, Reagan Shuku, Vestine Mukeshimana';
var gUsername = "";

/**
 * Fonction appelé lorsque le client tente de se connecter sur le serveur pour la 1ère fois.
 * Cette fonction permet la vérification du nom d'utilisateur et mot de passe (authentification)
 *
 * @param {Object} req requête 
 * @param {Object} res réponse
 * @param {Object} next suite
 */

var auth = function (req, res, next) {
	var user = basicAuth(req);
	if (!user || !user.name || !user.pass) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		res.sendStatus(401);
		return;
	}
	
	var found = false;
	
	for(var userObj in etat) {
		if(user.name === userObj.toString()) {
			//var t = encrypt('test');
			//console.log('t = ' + t);
			var pass = decrypt(etat[userObj].password);
			if(user.pass == pass) {
				gUsername = user.name;
				found = true;
				console.log('Logged in successfully');
				next();
			}
			break;
		}
	}
		
	if (!found) {
		res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
		res.sendStatus(401);
		return;
	}
}

 
app.get('/', function (req, res) {
	res.redirect('/register');
});

app.get('/register', function (req, res) {
	console.log('/register');
	res.render('register', { 'title': 'Sign Up', 'authors':authors});
});

app.post('/register_submit',function (req, res) {
	console.log('/register_submit');
	// pull the form variables off the request body
	var name = req.body['text-name'];
	var username = req.body['text-username'];
	var password = req.body['text-password'];
		
	var found = false;
	
	for(var userObj in etat) {
		if(username === userObj.toString()) {
			found = true;
			break;
		}
	}
	//console.log(req.body);
	//console.log(name);
	//console.log(username);
	//console.log(password);
	if(!found) {
		//console.log(pass);
		etat[username] = {'name':name, 'password':encrypt(password), 'inbox':[], 'outbox':[], 'yp':{}};
		res.render('register', {'title': 'Inbox', 'authors':authors,'message':'User "' + username + '" added successfully','error_type':'success'});
	}
	else {
		res.render('register', {'title': 'Sign Up', 'authors':authors,'message':'This user "' + username + '" already exists','error_type':'danger'});
	}
});

app.get('/login', auth, function (req, res) {
	console.log('/login');
	res.redirect('/inbox');
});

app.get('/inbox', auth, function (req, res) {
    console.log('/inbox');
	res.render('inbox', { 'title': 'Inbox', 'authors':authors, 'etat': etat[gUsername]});
});

app.get('/inbox_message', auth, function (req, res) {
	console.log('/inbox_message');
	res.render('inbox_message', { 'title': 'Inbox message', 'authors':authors, 'msg': decrypt(req.query.msg),'from': req.query.from,'date': req.query.date});
});

app.get('/outbox', auth, function (req, res) {
    console.log('/outbox');
	res.render('outbox', { 'title': 'Outbox', 'authors':authors, 'etat': etat[gUsername]});
});

app.get('/outbox_message', auth, function (req, res) {
	console.log('/outbox_message');
	res.render('outbox_message', { 'title': 'Outbox message', 'authors':authors, 'msg': decrypt(req.query.msg),'to': req.query.to,'date': req.query.date});
});

app.get('/compose', auth, function (req, res) {
    console.log('/compose');
	res.render('compose', { 'title': 'Compose', 'authors':authors, 'etat': etat[gUsername]});
});

app.post('/compose_send', auth, function (req, res) {
	console.log('/compose_send');
	// pull the form variables off the request body
	var to = req.body['select-compose'];
	var msg = req.body['textarea-compose'];
	var date = getCurrentDateTimeText();
	
	etat[gUsername]['outbox'].push({
		"to": to,
		"date": date,
		"msg": encrypt(msg) 
	}); 
	
	etat[to]['inbox'].push({
		"from": gUsername,
		"date": date,
		"msg": encrypt(msg) 
	});
		
	res.render('outbox', {'title': 'Outbox Message', 'authors':authors, 'etat': etat[gUsername], 'message':'Message sent','error_type':'success'});
});

app.get('/yp', auth, function (req, res) {
    console.log('/yp');
	 console.log(etat[gUsername].yp);
	res.render('yp', { 'title': 'Yp', 'authors':authors, 'etat': etat[gUsername]});
});


 
app.listen(3000);
console.log("mail app server running on localhost:3000");


/**
 * Fonction pour coder le text
 *
 * @param {String} plainText text non-codé 
 * @return {String} le text codé
 */
var encrypt = function (plainText) {
	var cipher = crypto.createCipher(ALGORITHM, KEY);  
	var encrypted = cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');

    return encrypted;
};

/**
 * Fonction pour décoder le text codé
 * @param {String} cipherText text non-codé 
 * @return {String} le text décodé
 */
var decrypt = function (cipherText) {
	var decipher = crypto.createDecipher(ALGORITHM, KEY);
	var decrypted = decipher.update(cipherText, 'hex', 'utf8') + decipher.final('utf8');

	return decrypted;
};

/**
 * Fonction pour arranger l'affichage de la date de cet instant.
 *
 * @return {String} la data bien arrangé selon le format "yyyy MM dd hh:mm:ss"
 */
var getCurrentDateTimeText = function (){
	var today = new Date();
	var yyyy = today.getFullYear();
	var mm = today.getMonth()+1;
	var dd = today.getDate();
	var hh = today.getHours();
	var MM = today.getMinutes();
	var ss = today.getSeconds();
	
	if(dd < 10) {
		dd = '0' + dd;
	}
	
	if(mm < 10) {
		mm = '0' + mm;
	} 
	
	if(hh < 10) {
		hh = '0' + hh;
	}
	
	if(MM < 10) {
		MM = '0' + MM;
	} 
	
	if(ss < 10) {
		ss = '0' + ss;
	} 
	
	return yyyy + " " +  mm + " " + dd + " " + hh + ":" + MM + ":" + ss;     
};
