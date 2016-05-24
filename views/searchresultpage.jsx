var React = require('react');
var ReactDOM = require('react-dom');
var apiData = require('../lib/requestAPI.js');

var SpotResult = React.createClass({
  render: function() {
    var imagesource = this.props.spot.imagesource;
    var contents = this.props.spot.contents;
    return (
      <tr>
        <td> <img src= {imagesource} width="200" height="200"/></td>
        <td> <div>{contents}</div></td>
      </tr>
    );
    }
});

var SpotResultList = React.createClass({
  render:function() {
    var rows = [];
    var lastCategory = null;
    console.log("<SPOTRESULTLIST: "+ this.props.spots +"SPOTRESULTLIST>");
    this.props.spots.forEach(function(spot) {
	console.log("SPOT:" + spot);
      rows.push(<SpotResult spot={spot}/>);
    });
    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});

var SearchBar = React.createClass({
  render: function () {
    return (
      <form>
        <input type="text" placeholder="Search..." />
      </form>
    );
  }
});

var SearchResultBox = React.createClass({
    render: function() {
    console.log("SEARCHRESULTBOX :" + this.props.spots );
    return (
      <div>
        <SearchBar />
        <SpotResultList spots = {this.props.spots} />
      </div>
    );
  }
});

var SearchResult = React.createClass({
    render: function() {
	return (
	    <SearchResultBox spots={this.props.apiData} />
	    );
	}
	});

module.exports = SearchResult;
