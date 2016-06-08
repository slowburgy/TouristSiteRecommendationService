'use strict';

function dp(dimPoint) {
    var factor = Math.min(window.innerHeight, window.innerWidth) / 1000;
    return dimPoint * factor;
}

function horizontalDP(dimPoint) {
    var factor = window.innerWidth / 1000;
    return dimPoint * factor;
}

function verticalDP(dimPoint) {
    var factor = window.innerHeight / 1000;
    return dimPoint * factor;
}

var appBarHeight = verticalDP(80);
var placePageTab = horizontalDP(250);
var mapWeatherContainerHeight = verticalDP(250);
var mapWeatherContainerWidth = horizontalDP(250);

exports.dp = dp;
exports.verticalDP = verticalDP;
exports.horizontalDP = horizontalDP;
exports.appBarHeight = appBarHeight;
exports.placePageTab = placePageTab;
exports.mapWeatherContainerHeight = mapWeatherContainerHeight;
exports.mapWeatherContainerWidth = mapWeatherContainerWidth;





