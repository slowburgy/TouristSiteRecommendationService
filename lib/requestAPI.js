SPOTS = [];
// var request = require('request');
var request = require("sync-request");
// spotArray = [];
abc = "";
exports.getSearchData = function(tourSpot){
    spotArray = [];
    console.log("getSearchData Called!");
    console.log(tourSpot);
    var apiReq = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=Vl%2FNG9WNK%2F%2FCGUB69MOymhAuu05DNo5IktLsLPguTQltikOdPfhKCbybcWhHh6%2BBjNBvqXuNuyzHyRYvqwMtaQ%3D%3D&keyword='+encodeURIComponent(tourSpot)+'&MobileOS=ETC&MobileApp=AppTesting&_type=json';

    var response = request('GET','http://api.visitkorea.or.kr/openapi/service/rest/KorService/searchKeyword?ServiceKey=Vl%2FNG9WNK%2F%2FCGUB69MOymhAuu05DNo5IktLsLPguTQltikOdPfhKCbybcWhHh6%2BBjNBvqXuNuyzHyRYvqwMtaQ%3D%3D&keyword='+encodeURIComponent(tourSpot)+'&MobileOS=ETC&MobileApp=AppTesting&_type=json');
    /*
       request(apiReq, function(error, response, body){

       if ( !error && response.statusCode == 200)
       {
       var jsonObj = JSON.parse(body);
       var item = jsonObj.response.body.items.item;
       var numRows = jsonObj.response.body.numOfRows;
       var total = jsonObj.response.body.items.totalCount;
       var pageNo = jsonObj.response.body.items.pageNo;
       var totalCnt = jsonObj.response.body.totalCount;
       if (totalCnt == 0 )
       {
       console.log("No data");
       }
       else {

       for ( var i = 0 ; i < item.length ; i++)
       {

       var spotElement = new Object();
       spotElement.category = item[i].title;
       spotElement.imagesource = item[i].firstimage;
       spotElement.contents = item[i].addr1;
       spotArray.push((spotElement));
       console.log("STOTARRAY TYPE:" + typeof (spotElement));
       console.log("SPOT TYPE : " + typeof(SPOTS[i]));
       }
       console.log(JSON.stringify(spotArray));
       tempArray = spotArray
       }
       abc = "asdasd"
       }
       }
     */
    console.log(response.getBody("UTF-8"));
    var jsonObj = JSON.parse(response.getBody("UTF-8"));

    var item = jsonObj.response.body.items.item;
    var numRows = jsonObj.response.body.numOfRows;
    var total = jsonObj.response.body.items.totalCount;
    var pageNo = jsonObj.response.body.items.pageNo;
    var totalCnt = jsonObj.response.body.totalCount;
    if (totalCnt == 0 )
    {
	console.log("No data");
    }
    else {

	for ( var i = 0 ; i < item.length ; i++)
	{

	    var spotElement = new Object();
	    spotElement.category = item[i].title;
	    spotElement.imagesource = item[i].firstimage;
	    spotElement.contents = item[i].addr1;
	    spotArray.push((spotElement));
	    console.log("STOTARRAY TYPE:" + typeof (spotElement));
	    console.log("SPOT TYPE : " + typeof(SPOTS[i]));
	}
	console.log(JSON.stringify(spotArray));
    }

    console.log("ENTIRE SPOTS TYPE:" + typeof(SPOTS));
    console.log("ENRIRE SPOTSARRAY TYPE:" + typeof(spotArray));
    console.log(spotArray);
    // console.log(tempArray);
    console.log(SPOTS);
    console.log("ABC IS:" + abc);
    return spotArray;
};
