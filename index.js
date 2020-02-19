const express = require('express');
const app = express();
const path = require('path');
const passport = require('./config/passport-setup');
const authRoute = require('./routes/auth-routes');
const cookieSession = require('cookie-session');
const mongodb = require('./mongodb/mongodb.connect');

const layout = require('./layout');

var dbURI = 'mongodb://localhost:27017/se';

// Encrypt cookie
app.use(
	cookieSession({
		maxAge: 24 * 60 * 60 * 1000 * 2,
		keys: [dbURI],
	}),
);

mongodb.connect(dbURI);

// init passport
passport(app);

app.use(express.static('public'));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use('/auth', authRoute);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const authcheck = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		req.session.redirectTo = req.originalUrl;
		res.redirect('/auth/login');
	}
};

app.get('/login', (req, res) => {
	if (!req.user) res.redirect('/auth/login');
	else res.redirect('/welcome');
});

app.get('/welcome', authcheck, (req, res) => {
	res.send(req.user);
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/start/', authcheck, (req, res) => {
	res.send(`
    <form action="/start/1" method="post"></form>
<script>
  document.forms[0].submit();
</script>
  `);
});

var designation, school, name, subject, period, degree, writer;

app.get('/lor', (req, res) => {
	res.render('lor.ejs', {
		school,
		designation,
		name,
		period,
		degree,
		subject,
		writer,
	});
});

app.post('/start/:question', authcheck, (req, res) => {
	var id = parseInt(req.params.question);
	console.log(req.body);

	var response = req.body ? req.body.answer : '';
	switch (id) {
		case 1:
			var question = 'Lets get to know the applicant. How about the name?';
			var sampleAnswer = 'rishav';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 2:
			name = response;

			var question = 'Name of the Referee?';
			var sampleAnswer = 'rahil';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 3:
			writer = response;

			var question = "Referee's designation?";
			var sampleAnswer = 'Director';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 4:
			designation = response;

			var question = 'Your college?';
			var sampleAnswer = 'NOT VIT please';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 5:
			school = response;

			var question = 'What did the applicant teach?';
			var sampleAnswer = 'Chemistry';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 6:
			subject = response;

			var question = 'How long did he/she teach ' + subject + ' ?';
			var sampleAnswer = '3, four';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		case 7:
			period = response;

			var question = 'His/her degree?';
			var sampleAnswer = 'B.Tech';
			id = id + 1;
			var solution = layout(id, sampleAnswer, question);
			res.render('question.ejs', { layout: solution });
			break;
		default:
			degree = response;
			res.redirect('/lor');
	}
});

var port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log('App listening on http://localhost:' + port);
});
