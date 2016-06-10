/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var session = require('express-session');
var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
var util = require('util');
var api = require('./api');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'toursql',
    database: 'mysql'
});

// FACE BOOK OAUTH
// serialize
// 인증후 사용자 정보를 세션에 저장
passport.serializeUser(function(user, done) {
	console.log('serialize');
	console.log("user : " + JSON.stringify(user));
	done(null, user);
});


// deserialize
// 인증후, 사용자 정보를 세션에서 읽어서 request.user에 저장
passport.deserializeUser(function(user, done) {
	//findById(id, function (err, user) {
    console.log('deserialize');
    done(null, user);
    //});
	});

passport.use(new FacebookStrategy({
    clientID: '1404570266509220',
    clientSecret: '691a373e94e46fc1444baf8d03635846',
    callbackURL: "http://143.248.48.156:3000/auth/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken);
    done(null,profile);
}));

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// For FB OAUTH Session.
app.use(session({ secret: 'your secret here' }));
app.use(passport.initialize());
app.use(passport.session());

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/', express.static(__dirname));

app.get('/api/userinfo', api.userinfo);
app.get('/api/signup', api.signup);
app.get('/api/usermodify', api.usermodify);
app.get('/api/login', api.login);
app.get('/api/prefinfo', api.prefinfo);
app.get('/api/recommend', api.recommend);
app.get('/api/addpref', api.addpref);
app.get('/api/randomplace', api.randomplace);
app.get('/api/addplace', api.addplace);
app.get('/api/like', api.like);
app.post('/api/review', api.review);
app.get('/api/numpref', api.numpref);
app.get('/api/getlike', api.getlike);
app.get('/api/getreview', api.getreview);

// FACEBOOK OAUTH 
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/login_success', failureRedirect: '/login_fail' }));
app.get('/login_success', ensureAuthenticated, function(req, res){
    res.send(req.user);
    /*
	Something will be added.
    */
});

app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

function ensureAuthenticated(req, res, next) {
    // if log in success, go to the next step.
    if (req.isAuthenticated()) {
        console.log("Login");
        console.log("user :" + util.inspect(req.session.passport ));
        return next(); }
    // if not logged in, go to the login page.
    console.log("Not logged in");
    res.redirect('/');
}

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
