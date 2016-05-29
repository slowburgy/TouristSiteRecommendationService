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

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'toursql',
    database: 'mysql'
});

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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

// BACKEND
var checkSex = function(str) {
    if (str == "m") return 0;
    else if (str == "w") return 1;
    else return 2;
};

var checkStyle = function(str) {
    if (str == "alone") return 1;
    else if (str == "couple") return 2;
    else if (str == "friend") return 3;
    else if (str == "family") return 4;
    else return 5;
};

var makeUid = function() {
    var uid = crypto.randomBytes(20).toString('hex');
    var query = connection.query(
                'select * from tourUser where uid'+mysql.escape(uid),
                function(err, result) {
                    if (err) {
                        uid = makeUid();
                    }
                if (result && !result.length) return uid;
                else uid = makeUid();
    });
    return uid;
};
              
app.get('/api/userinfo', function(req, res) {
    var query = connection.query(
                'select age, sex, travStyle from tourUser where uid='+mysql.escape(req.query.uid),
                function(err, result) {
                    if (err) {
                        console.error(err);
                        res.json({'result':'-1'});
                    }
                    if (result && result.length) res.json({"result":"1", "userprofile":result[0]});
                    else res.json({"result":"-1"})
    });
});
app.get('/api/signup', function(req, res) {
    var user = {'uid':makeUid(),
                'OAuth':req.query.OAuth,
                'age':Number(req.query.age),
                'sex':checkSex(req.query.sex),
                'travStyle':checkStyle(req.query.travStyle)};
    var query = connection.query(
                'insert into tourUser set ?', user,
                function(err,result){
                    if (err) {
                        console.error(err);
                        res.json({'result':'-1'});
                    }
                res.json({'result':'1'});
    });
});
app.get('/api/usermodify', function(req, res) {
    var user = {'age':Number(req.query.age),
                'sex':checkSex(req.query.sex),
                'travStyle':checkStyle(req.query.travStyle)};
    var query = connection.query(
                'update tourUser set ? where uid='+mysql.escape(req.query.uid), user,
                function(err,result){
                    if (err) {
                        console.error(err);
                        res.json({'result':'-1'});
                    }
                res.json({'result':'1'});
    });
});
app.get('/api/login', function(req, res) {
    var query = connection.query(
                'select uid from tourUser where OAuth='+mysql.escape(req.query.OAuth),
                function(err,result){
                    if (err) {
                        console.error(err);
                        res.json({'result':'-1'});
                    }
                if (result && result.length) res.json({"result":"1", "uid":result[0]["uid"]});
                else res.json({"result":"-1"});
    });
});
app.get('/api/prefinfo', function(req, res) {
    var query = connection.query(
                'select pref from tourPref where uid='+mysql.escape(req.query.uid)+
                ' and cid='+Number(req.query.cid),
                function(err,result){
                    if (err) {
                       console.error(err);
                       res.json({'result':'-1'});
                    }
                if (result && result.length) res.json({"result":"1", 'pref':result[0]['pref']});
                else res.json({"result":"0"});
    });
});
app.get('/api/recommend', function(req, res) {
    // DO SOMETHING;
    res.send(200, "NOT YET IMPLEMENTED");
});
app.get('/api/addpref', function(req, res) {
    var pref = Number(req.query.pref)
    var data = 'uid='+mysql.escape(req.query.uid)+
               ' and cid='+Number(req.query.cid);
    var query = connection.query(
                'select * from tourPref where '+data,
                function(err,result){
                    if (err) {
                        console.error(err);
                        res.json({'result':'-1'});
                    }
                    if (result) {
                        if (result.length != 0) {
                            var update = connection.query(
                                     'update tourPref set pref='+pref+
                                     ' where '+data,
                                     function(err, result){
                                         if (err) {
                                             console.error(err);
                                             res.json({'result':'-1'});
                                         }
                                     res.json({'result':'2'})});
                        } else {
                            var insert = connection.query(
                                     'insert into tourPref set ?',
                                                       {'uid':req.query.uid,
                                                        'cid':Number(req.query.cid),
                                                        'pref':pref}, 
                                     function(err, result){
                                         if (err) {
                                             console.error(err);
                                             res.json({'result':'-1'});
                                         }
                                     res.json({'result':'1'})});
                        }
                    } else {
                        res.json({'result':'-1'});
                    }
                }
);});
app.get('/api/randomplace', function(req, res) {
    // DO SOMETHING;
    res.send(200, "NOT YET IMPLEMENTED");
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
