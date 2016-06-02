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

var checkSex = function(str) {
    switch (str) {
        case "m": return 0;
        case "w": return 1;
        default: return 2;
    }
};

var checkStyle = function(str) {
    switch (str) {
        case "alone": return 1;
        case "couple": return 2;
        case "friend": return 3;
        case "family": return 4;
        default: return 5;
    }
};

var makeUid = function() {
    var uid = crypto.randomBytes(20).toString('hex');
    var query = connection.query(
                'select * from tourUser where uid'+mysql.escape(uid),
                function(err, result) {
                    if (err) {
                        uid = makeUid();
                    }
                    if (!result || !result.length) return uid;
                    else uid = makeUid();
    });
    return uid;
};

function isEmpty(value){
    return (value == null || value == NaN || value.length == 0 || typeof value == undefined);
}

exports.userinfo = function(req, res) {
    if (isEmpty(req.query.uid))
	return res.json({'result':-2});
    var query = connection.query(
                'select age, sex, travStyle from tourUser where uid='+mysql.escape(req.query.uid),
                function(err, result) {
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    if (!result || !result.length) res.json({'result':-1})
                    else res.json({'result':1, 'userprofile':result[0]});
    });
};

exports.signup = function(req, res) {
    if ( isEmpty(req.query.OAuth) || isEmpty(req.query.age) || isEmpty(req.query.sex) || isEmpty(req.query.travStyle))
        return res.json({'result':-2});

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
                        return res.json({'result':-1});
                    }
                    res.json({'result':1});
    });
};

exports.usermodify = function(req, res) {
    if ( isEmpty(req.query.uid) || isEmpty(req.query.age) || isEmpty(req.query.sex)|| isEmpty(req.query.travStyle))
	return res.json({'result':-2});
    var user = {'age':Number(req.query.age),
                'sex':checkSex(req.query.sex),
                'travStyle':checkStyle(req.query.travStyle)};
    var query = connection.query(
                'update tourUser set ? where uid='+mysql.escape(req.query.uid), user,
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    res.json({'result':1});
    });
};

exports.login = function(req, res) {
    if ( isEmpty(req.query.OAuth))
	return res.json({'result':-2});
    var query = connection.query(
                'select uid from tourUser where OAuth='+mysql.escape(req.query.OAuth),
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    if (!result || !result.length) res.json({'result':-1});
                    else res.json({'result':1, 'uid':result[0]['uid']});
    });
};

exports.prefinfo = function(req, res) {
    if ( isEmpty(req.query.uid) || isEmpty(req.query.cid))
            return res.json({'result':-2});
    var query = connection.query(
                'select pref from tourPref where uid='+mysql.escape(req.query.uid)+
                ' and cid='+Number(req.query.cid),
                function(err,result){
                    if (err) {
                       console.error(err);
                       return res.json({'result':'-1'});
                    }
                    if (!result || !result.length) res.json({'result':0});
                    else res.json({"result":"1", 'pref':result[0]['pref']});
    });
};

exports.recommend = function(req, res) {
    // DO SOMETHING;
    res.send(200, "NOT YET IMPLEMENTED");
};

exports.addpref = function(req, res) {
    if ( isEmpty(req.query.pref) || isEmpty(req.query.uid) || isEmpty(req.query.cid))
	return res.json({'result':-2});

    var pref = Number(req.query.pref)
    var data = 'uid='+mysql.escape(req.query.uid)+
               ' and cid='+Number(req.query.cid);
    var query = connection.query(
                'select * from tourPref where '+data,
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    if (result) {
		        if (result.length) {
		            var update = connection.query(
                                         'update tourPref set pref='+pref+
                                         ' where '+data,
                                         function(err, result){
                                             if (err) {
                                                 console.error(err);
                                                 return res.json({'result':-1});
                                             }
                                             res.json({'result':2})}
                            );
		        } else {
		            var insert = connection.query(
                                         'insert into tourPref set ?',
                                        {'uid':req.query.uid,
			  	         'cid':Number(req.query.cid),
	                                 'pref':pref}, 
				         function(err, result){
				             if (err) {
				 	         console.error(err);
                                                 return res.json({'result':-1});
                                             }
                                             res.json({'result':1})}
                            );
		        }
		    } else {
		        res.json({'result':'-1'});
		    }
    });
};

exports.randomplace = function(req, res) {
    // DO SOMETHING;
    res.send(200, "NOT YET IMPLEMENTED");
};

exports.addplace = function(req, res) {
    // DO SOMETHING;
    res.send(200, "NOT YET IMPLEMENTED");
};
