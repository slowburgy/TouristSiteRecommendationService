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
    this.props.spots.forEach(function(spot) {
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
    return (
      <div>
        <SearchBar />
        <SpotResultList spots = {this.props.spots} />
      </div>
    );
  }
});

var SPOTS = [
  {category: 'Seoul', imagesource:'No-text1', contents:'No-text1'},
  {category: 'Seoul', imagesource:'No-text2', contents:'No-text2'},
  {category: 'Seoul', imagesource:'No-text3', contents:'No-text3'},
  {category: 'Seoul', imagesource:'No-text4', contents:'No-text4'},
  {category: 'Seoul', imagesource:'No-text5', contents:'No-text5'},
  {category: 'Seoul', imagesource:'No-text6', contents:'No-text6'},
  {category: 'Seoul', imagesource:'No-text7', contents:'No-text7'},
  {category: 'Seoul', imagesource:'No-text8', contents:'No-text8'},
  {category: 'Seoul', imagesource:'No-text9', contents:'No-text9'},
  {category: 'Seoul', imagesource:'No-text10', contents:'No-text10'}
];

ReactDOM.render(
  <SearchResultBox spots={SPOTS} />,
  document.getElementById('content')
);

