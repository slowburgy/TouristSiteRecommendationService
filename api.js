var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');
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
                'travStyle':checkStyle(req.query.travStyle),
                'numPref':0};
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
                                             var prefup = connection.query(
                                                          'update tourUser set numPref = numPref + 1 where uid='+mysql.escape(req.query.uid),
                                                          function(err, result){
                                                              if (err) {
                                                                  console.error(err);
                                                                  return res.json({'result':-1});
                                                             }
                                                          });
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
    if ( isEmpty(req.query.areaCode) || isEmpty(req.query.sigunguCode) || isEmpty(req.query.page))
	return res.json({'result':-2});

    var areaCode = req.query.areaCode;
    var sigunguCode = req.query.sigunguCode;
    var page = req.query.page;

    var url = "http://api.visitkorea.or.kr/openapi/service/rest/EngService/areaBasedList?ServiceKey=lDzm86gYb%2Bcz6q1Kl4XPb1oXrRMMxbO0gUs%2BAEs9eVZpIQr6JigwOwbOvKCBkrth0%2Bnnq4V%2BDZlrbRdkZOYqSQ%3D%3D&contentTypeId=76&areaCode="+areaCode+"&sigunguCode="+sigunguCode+"&cat1=&cat2=&cat3=&listYN=Y&MobileOS=ETC&MobileApp=PRAC4APP&arrange=A&numOfRows=25&pageNo="+page+"&_type=json";
    request(url, function(err, resp, body) {
        var body = JSON.parse(body);

        if (body.response.header.resultCode != "0000")
            return res.json({'result':body.response.header.resultCode});

        var total = body.response.body.totalCount;
        var item = body.response.body.items.item;
        var added = 0;

        if (!item || !item.length) return res.json({'result':-1});
        for (i=0; i<item.length; i++) {
            var cid = item[i].contentid;
            var placedata = {'cid':cid,
                'areaCode':areaCode,
                'sigunguCode':sigunguCode};
            var place = connection.query(
                'insert into tourPlace set ?', placedata,
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
            });
            added++;
        }
        return res.json({'total':total, 'added':added});
    });
};

exports.like = function(req, res) {
    if ( isEmpty(req.query.uid) || isEmpty(req.query.cid))
	return res.json({'result':-2});

    var data = 'uid='+mysql.escape(req.query.uid)+
               ' and cid='+Number(req.query.cid);
    var query = connection.query(
                'select * from tourLike where '+data,
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    if (result) {
		        if (result.length) {
		            var update = connection.query(
                                         'delete from tourLike where '+data,
                                         function(err, result){
                                             if (err) {
                                                 console.error(err);
                                                 return res.json({'result':-1});
                                             }
                                             res.json({'result':2})}
                            );
		        } else {
		            var insert = connection.query(
                                         'insert into tourLike set ?',
                                        {'uid':req.query.uid,
			  	         'cid':Number(req.query.cid)},
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

exports.review = function(req, res) {
    if ( isEmpty(req.body.review) || isEmpty(req.body.uid) || isEmpty(req.body.cid))
	return res.json({'result':-2});

    var review = mysql.escape(req.query.review)
    var data = 'uid='+mysql.escape(req.query.uid)+
               ' and cid='+Number(req.query.cid);
    var query = connection.query(
                'select * from tourReview where '+data,
                function(err,result){
                    if (err) {
                        console.error(err);
                        return res.json({'result':-1});
                    }
                    if (result) {
		        if (result.length) {
		            var update = connection.query(
                                         'update tourReview set review='+review+
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
                                         'insert into tourReview set ?',
                                        {'uid':req.query.uid,
			  	         'cid':Number(req.query.cid),
	                                 'review':review}, 
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

exports.numpref = function(req, res) {
    if ( isEmpty(req.query.uid))
            return res.json({'result':-2});
    var query = connection.query(
                'select numPref from tourUser where uid='+mysql.escape(req.query.uid),
                function(err,result){
                    if (err) {
                       console.error(err);
                       return res.json({'result':'-1'});
                    }
                    if (!result || !result.length) res.json({'result':-1});
                    else res.json({"result":result[0]['numPref']});
    });
};

exports.getlike = function(req, res) {
    if ( isEmpty(req.query.uid))
            return res.json({'result':-2});
    var query = connection.query(
                'select cid from tourLike where uid='+mysql.escape(req.query.uid),
                function(err,result){
                    if (err) {
                       console.error(err);
                       return res.json({'result':'-1'});
                    }
                    if (!result || !result.length) res.json({'result':0});
                    else res.json({"result":"1", 'likes':result});
    });
};

exports.getreview = function(req, res) {
    if ( isEmpty(req.query.cid))
            return res.json({'result':-2});
    var query = connection.query(
                'select review from tourReview where cid='+Number(req.query.cid),
                function(err,result){
                    if (err) {
                       console.error(err);
                       return res.json({'result':'-1'});
                    }
                    if (!result || !result.length) res.json({'result':0});
                    else res.json({"result":"1", 'reviews':result});
    });
};
