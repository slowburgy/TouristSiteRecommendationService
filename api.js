var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var request = require('request');
var srequest = require('sync-request');
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

var getExp = function(age, sex, travStyle, area) {
    return "Recommedation ~~";
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
        'select age, sex, travStyle, nickname, age, nationality, numPref from tourUser where uid='+mysql.escape(req.query.uid),
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
    if (isEmpty(req.query.uid) || isEmpty(req.query.age) || isEmpty(req.query.sex) || isEmpty(req.query.travStyle)|| isEmpty(req.query.nickname) || isEmpty(req.query.nationality))
        return res.json({'result':-2});

    var user = {'uid':req.query.uid,
        'age':Number(req.query.age),
        'sex':checkSex(req.query.sex),
        'travStyle':checkStyle(req.query.travStyle),
        'nationality':req.query.nationality,
        'nickname':req.query.nickname,
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
    if ( isEmpty(req.query.uid) || isEmpty(req.query.age) || isEmpty(req.query.sex) || isEmpty(req.query.travStyle) || isEmpty(req.query.nickname) || isEmpty(req.query.nationality) )
        return res.json({'result':-2});
    var user = {'age':Number(req.query.age),
        'sex':checkSex(req.query.sex),
        'nationality':req.query.nationality,
        'nickname':req.query.nickname,
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

exports.uidcheck = function(req, res) {
    if ( isEmpty(req.query.uid))
        return res.json({'result':-2});
    var query = connection.query(
        'select uid from tourUser where uid='+mysql.escape(req.query.uid),
        function(err,result){
            if (err) {
                console.error(err);
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':0});
            else res.json({"result":1});
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
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':0});
            else res.json({"result":1, 'pref':result[0]['pref']});
        });
};

exports.recommend = function(req, res) {
    // Here, input should be (age, sex, travStyle, area, [uid]optional)
    // Example: age = 25, sex = 'W', travStyle = 'alone', area = 1 (area code from API)
    console.log(req.query);
    if ( isEmpty(req.query.age) || isEmpty(req.query.sex) ||
        isEmpty(req.query.travStyle) || isEmpty(req.query.area))
        return res.json({'result':-2});
    var age = Number(req.query.age);
    var sex = checkSex(req.query.sex);
    var travStyle = checkStyle(req.query.travStyle);
    var inner_query = '1';
    if (sex != 2) inner_query = inner_query + ' and sex = '+sex;
    if (age != 0) inner_query = inner_query + ' and age > '+age+' and age < '+(age+10);
    if (travStyle != 5) inner_query = inner_query + ' and travStyle = '+travStyle;
    var area = Number(req.query.area);
    var exp = getExp(age, sex, travStyle, area);
    if ( isEmpty(req.query.uid)) {
        var query = connection.query(
            'select cid, avg(pref) as pref from tourPref where '+
            'uid in (select uid from tourUser where '+inner_query+
            ') and cid in (select cid from tourPlace where areaCode='+area+
            ') group by cid order by pref desc',
            function(err,result){
                if (err) {
                    console.error(err);
                    return res.json({'result':-1});
                }
                if (!result || !result.length) res.json({'result':0});
                else {
                    var i=0; var items = [];
                    (function loop() {
                        if (i<Math.min(7,result.length)) {
                            if (i != result.length - 1) getPlaceData(result[i].cid, items, result[i].pref, exp, null);
                            else getPlaceData(result[i].cid, items, result[i].pref, exp, res);
                            i++;
                            loop();
                        }}());
                }});
    } else {
        var uid = req.query.uid;
        // cid condition can be deleted.
        var query = connection.query(
            'select uid, avg(pref) as pref from tourPref where '+
            'uid in (select uid from tourUser where '+inner_query+') and '+
            'cid in (select cid from tourPlace where areaCode='+area+')'+
            ' group by uid',
            function(err,result){
                if (err) {
                    console.error(err);
                    return res.json({'result':-1});
                }
                if (!result || !result.length) return res.json({'result':0});
                else {
                    var query2 = connection.query(
                        'select uid, cid, pref from tourPref where '+
                        'uid in (select uid from tourUser where '+inner_query+') and '+
                        'cid in (select cid from tourPlace where areaCode='+area+')',
                        function(err,result2){
                            if (err) {
                                console.error(err);
                                return res.json({'result':-1});
                            }
                            if (!result2 || !result2.length) return ({'result':0});
                            else {
                                var query2 = connection.query(
                                    'select distinct cid from tourPref where '+
                                    'uid in (select uid from tourUser where '+
                                    inner_query+') and '+
                                    'cid in (select cid from tourPlace '+
                                    'where areaCode='+area+')',
                                    function(err,result3){
                                        if (err) {
                                            console.error(err);
                                            return res.json({'result':-1});
                                        }
                                        if (!result3 || !result3.length) return res.json({'result':0});
                                        else recom_callback(res, result, result2, result3, uid, exp);
                                    });
                            }
                        });
                }
            });
    }
};

var recom_callback = function(res, usr_avg_list, all_pref, place_list, uid, exp) {
    var usr_dict = {};
    var place_dict = {};
    var pref_list = new Array();
    for (i=0; i<usr_avg_list.length; i++) {
        usr_dict[usr_avg_list[i]["uid"]] = i;
        pref_list.push(new Array());
        for (j=0; j<place_list.length; j++) {
            pref_list[i].push(0);
        }
    }
    for (i=0; i<place_list.length; i++) {
        place_dict[place_list[i]["cid"]] = i;

    }
    for (i=0; i<all_pref.length; i++) {
        var now = all_pref[i];
        pref_list[usr_dict[now["uid"]]][place_dict[now["cid"]]] = now["pref"];
    }
    un = usr_dict[uid];
    var final_list = sort_by_wsum(pref_list, usr_avg_list, place_list, un);
    var items = []; var i = 0;
    (function loop() {
        if (i<final_list.length) {
            if (i != final_list.length - 1) getPlaceData(final_list[i].cid, items, final_list[i].pref, exp, null);
            else getPlaceData(final_list[i].cid, items, final_list[i].pref, exp, res);
            i++;
            loop();
        }}());
};

var sort_by_wsum = function(pref_list, usr_avg_list, place_list, un) {
    var final_list = [];
    var sim_list = new Array();
    for (i=0; i<pref_list[0].length; i++) {
        sim_list.push(new Array());
        for (j=0; j<pref_list[0].length; j++) {
            if (i > j) sim_list[i].push(sim_list[j][i]);
            else sim_list[i].push(sim(pref_list, usr_avg_list, i, j));
        }
    }
    for (j=0; j<pref_list[0].length; j++) {
        var x = weighted_sum(pref_list, sim_list, j, un);
        final_list.push({"cid":place_list[j]["cid"], "pref":x});
    }
    return final_list;
};

var weighted_sum = function(pref_list, sim_list, j, un) {
    var up = 0.000000;
    var down = 0.000000;
    for(k=0; k<pref_list[0].length; k++) {
        if (sim_list[j][k] > 0.150 && pref_list[un][k] != 0) {
            // You can change the value 0.150
            up = up + sim_list[j][k]*pref_list[un][k];
            down = down + Math.abs(sim_list[j][k]);
        }
    }
    if (down == 0.000000) return 0.000000;
    else return up/down;
};

var sim = function(pref_list, usr_avg_list, i, j) {
    if (i == j) return 0.000000;
    var exist = false;
    var up = 0.000000; var down1 = 0.000000; var down2 = 0.000000;
    for (k=0; k<pref_list.length; k++) {
        if (pref_list[k][i] == 0 || pref_list[k][j] == 0 || usr_avg_list[k]["pref"] == 0)
            continue;
        var x = pref_list[k][i] - usr_avg_list[k]["pref"];
        var y = pref_list[k][j] - usr_avg_list[k]["pref"];
        if (x == 0 || y == 0) exist = true;
        up = up + x*y; down1 = down1 + x*x; down2 = down2 + y*y;
    }
    if ((down1 == 0) || (down2 == 0)) {
        if (exist) return 1.000000;
        else return 0.000000;
    }
    else return up / Math.sqrt(down1*down2);
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
                            return res.json({'result':2})}
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
    var sqlQuery = "select cid from tourPlace order by rand() limit 10;"
    var query = connection.query(sqlQuery,
        function(err,result){
            if (err) {
                console.error(err);
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':0});
            else {
                var items = []; var i = 0;
                (function loop() {
                    if (i<result.length) {
                        if (i != result.length - 1) items = getPlaceData(result[i].cid, items, null, null, null);
                        else { console.log(items); items = getPlaceData(result[i].cid, items, null, null, res); }
                        i++;
                        loop();
                    }}());
            }});
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
        var isSended = false;
        for (i=0; i<item.length; i++) {
            var cid = item[i].contentid;
            var placedata = {'cid':cid,
                'areaCode':areaCode,
                'sigunguCode':sigunguCode};
            var place = connection.query(
                'insert into tourPlace set ?', placedata,
                function(err,result){
                    if (err) {
                        if (isSended) {return ;}
                        console.error(err);
                        isSended = true;
                        return res.json({'result':-1});
                    }else
                    {
                        if (isSended) {return ;}
                        isSended = true;
                        return res.json({'total':total, 'added':added});
                    }
                });
            added++;
        }
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
                //if (result.length) {
                //    var update = connection.query(
                //                 'delete from tourLike where '+data,
                //                 function(err, result){
                //                     if (err) {
                //                         console.error(err);
                //                         return res.json({'result':-1});
                //                     }

                res.json({'result':2})
            }
            //    );
            else {
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
        }
    else {
        res.json({'result':'-1'});
    }
});
};

exports.review = function(req, res) {
    if ( isEmpty(req.body.review) || isEmpty(req.body.star) ||
        isEmpty(req.body.uid) || isEmpty(req.body.cid))
        return res.json({'result':-2});
    var review = mysql.escape(req.query.review);
    var star = Number(req.query.star);
    var date = new Date();
    date.setHours(date.getHours() + 9);
    date_str = date.getUTCFullYear() + "." + (1+date.getUTCMonth()) + "." + date.getUTCDate();
    date.setHours(date.getHours() + 9);
    console.log(date);
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
                    //    var update = connection.query(
                    //                 'update tourReview set review='+review+
                    //                 ', star='+star+
                    //                 ', date='+date_str+
                    //                 ' where '+data,
                    //                 function(err, result){
                    //                     if (err) {
                    //                         console.error(err);
                    //                         return res.json({'result':-1});
                    //                     }
                    res.json({'result':2})}
                //    );
            } else {
                var insert = connection.query(
                    'insert into tourReview set ?',
                    {'uid':req.query.uid,
                        'cid':Number(req.query.cid),
                        'review':review,
                        'star': star,
                        'date': date_str},
                    function(err, result){
                        if (err) {
                            console.error(err);
                            return res.json({'result':-1});
                        }
                        res.json({'result':1})}
                );
            }
        } else {
        res.json({'result':-1});
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
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':-1});
            else res.json({"result":result[0]['numPref']});
        });
};

exports.getlike = function(req, res) {
    if ( isEmpty(req.query.uid))
        return res.json({'result':-2});
    else if ( isEmpty(req.query.cid)) {
        var query = connection.query(
            'select cid from tourLike where uid='+mysql.escape(req.query.uid),
            function(err,result){
                if (err) {
                    console.error(err);
                    return res.json({'result':'-1'});
                }
                if (!result || !result.length) res.json({'result':0});
                else {
                    var items = []; var i = 0;
                    (function loop() {
                        if (i<result.length) {
                            if (i != result.length - 1) items = getPlaceData(result[i].cid, items, null, null, null);
                            else items = getPlaceData(result[i].cid, items, null, null, res);
                            i++;
                            loop();
                        }}());
                }
            });
    } else {
        var query2 = connection.query(
            'select cid from tourLike where uid='+mysql.escape(req.query.uid)+
            ' and cid='+Number(req.query.cid),
            function(err,result){
                if (err) {
                    console.error(err);
                    return res.json({'result':'-1'});
                }
                if (!result || !result.length) res.json({'result':0});
                else res.json({"result":1});
            });
    }
};

exports.getreviewByCID = function(req, res) {
    if ( isEmpty(req.query.cid))
        return res.json({'result':-2});
    var query = connection.query(
        'select review, date, star from tourReview'+
        ' where cid='+Number(req.query.cid),
        function(err,result){
            if (err) {
                console.error(err);
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':0});
            else res.json({"result":1, 'items':result});
        });
};

exports.getreviewByUID = function(req, res) {
    if ( isEmpty(req.query.uid))
        return res.json({'result':-2});
    var query = connection.query(
        'select cid, review as content, date from tourReview'+
        ' where uid='+mysql.escape(req.query.uid),
        function(err,result){
            if (err) {
                console.error(err);
                return res.json({'result':-1});
            }
            if (!result || !result.length) res.json({'result':0});
            else {
                var items = []; var i = 0;
                (function loop() {
                    if (i<result.length) {
                        if (i != result.length - 1) items = getPlaceData(result[i].cid, items, null, null, null);
                        else items = getPlaceData(result[i].cid, items, null, null, null);
                        items[i].starRating = 3; //TEMP
                        items[i].content = result[i].content;
                        items[i].date = result[i].date;
                        i++;
                        loop();
                    }}());
                res.json({"result":1, 'items':items});
            }
        });
};

var getPlaceData = function(cid, items, pref, exp, res) {
    var response = srequest("GET", "http://api.visitkorea.or.kr/openapi/service/rest/EngService/detailCommon?ServiceKey=lDzm86gYb%2Bcz6q1Kl4XPb1oXrRMMxbO0gUs%2BAEs9eVZpIQr6JigwOwbOvKCBkrth0%2Bnnq4V%2BDZlrbRdkZOYqSQ%3D%3D&MobileOS=ETC&MobileApp=PRAC4APP&defaultYN=Y&areacodeYN=Y&firstImageYN=Y&mapinfoYN=Y&addrinfoYN=Y&overviewYN=Y&contentId="+cid+"&_type=json");
    var item = JSON.parse(response.getBody()).response.body.items.item;
    var response2 = srequest("GET", "https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text=%22("+item.mapy+","+item.mapx+")%22)&format=json");
    var weather = JSON.parse(response2.getBody()).query.results.channel.item.condition
    var data = {"cid": item.contentid,
        "name": item.title,
        "address": "("+item.zipcode+") "+item.addr1,
        "latitude": item.mapy,
        "longitude": item.mapx,
        "img": item.firstimage,
        "weather": weather.text,
        "temp": (5*(weather.temp-32)/9).toFixed(1),
        "starRating": 3, // TEMP
        "reviews": []} // TEMP;
    if (pref == null) {
        items.push({"item":data});
        if (res != null) return res.json({'result':1, 'data':items});
        else return items;
    } else {
        items.push({"item":data, "pref":pref});
        if (res != null) return res.json({'result':1, 'data':{'exp':exp, 'items':items}});
        else return items;
    }
};
