var mountNode = document.getElementById("content");

var Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    Navbar = ReactBootstrap.Navbar,
    NavDropdown = ReactBootstrap.NavDropdown,
    MenuItem = ReactBootstrap.MenuItem,
    Button  = ReactBootstrap.Button,
    Grid = ReactBootstrap.Grid,
    Row = ReactBootstrap.Row,
    Col = ReactBootstrap.Col;

var ourCoolServiceName = "CoolService";

var MenuBar = React.createClass({
    handleSelect(selectedKey) {
        console.log("Selected " + selectedKey);
    },

    render() {
        return (
            <Navbar bsStyle="inverse">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#" style={{ fontSize: 30 }}>{ourCoolServiceName}</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavDropdown eventKey={1} title="Popular places" id="popular_dropdown">
                        <MenuItem eventKey={1.1} onSelect={this.handleSelect}>Seoul</MenuItem>
                        <MenuItem eventKey={1.2} onSelect={this.handleSelect}>Daejeon</MenuItem>
                        <MenuItem eventKey={1.3} onSelect={this.handleSelect}>Busan</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={1.3} onSelect={this.handleSelect}>Popular places</MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Browse">
                        <MenuItem eventKey={3.1} onSelect={this.handleSelect}>SEARCH ENGINE</MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={2} title="My page" id="mypage_dropdown">
                        <MenuItem eventKey={2.1} onSelect={this.handleSelect}>Favorites</MenuItem>
                        <MenuItem eventKey={2.2} onSelect={this.handleSelect}>History</MenuItem>
                        <MenuItem eventKey={2.3} onSelect={this.handleSelect}>Login</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={2.3} onSelect={this.handleSelect}>Account settings</MenuItem>
                    </NavDropdown>
                </Nav>
                <Nav pullRight>
                    <NavItem eventKey={3} href="#">Login</NavItem>
                </Nav>
            </Navbar>
        );
    }
});

var Recommendation = React.createClass({
  render: function() {
    return (
      <a href={"infor.html"}>
        <div className="recom" style={{float:"left", width:"150px", margin:"15px"}}>
          <center>
            <h3>
              {this.props.name}
            </h3>
            <h2>
              {this.props.pref}
            </h2>
            <img src={"img/" + this.props.recipeID + ".jpg"} width="150px" height="150px"/>
          </center>
          <h4>{this.props.explain}</h4>
        </div>
      </a>
    );
  }
});

var SearchBar = React.createClass({
  getInitialState: function() {
    return {query: ''};
  },
  handleTextChange: function(e) {
    this.setState({query: e.target.value});
  },
  handleSearch: function() {
      window.location = 'old/searchresultpage.html';
},
  render: function() {
    return (
      <form className="SearchForm">
        <input type="text" placeholder="Search.." onChange={this.handleTextchange} />
        <input type="button" value="Search" onClick={this.handleSearch.bind(this)} />
      </form>
    );
  }
});

var SearchBox = React.createClass({
  render: function() {
    return (
      <div className="SearchBox" style={{clear:"both"}}>
        <h2>Our service makes you happy.</h2>
        <div className="SearchBarBox">
          <SearchBar />
        </div>
      </div>
    );
  }
});

var RecommendBox = React.createClass({
  render: function() {
    return (
      <div className="RecommendBox">
        <Recommendation name="Castle" pref="4.3" explain="ABCDEF..." placeID="1" />
        <Recommendation name="House" pref="4.0" explain="ABCDEFG..." placeID="2" />
        <Recommendation name="Rest Room" pref="3.7" explain="ABCDEFGH..." placeID="3" />
        <Recommendation name="PC Room" pref="3.3" explain="ABCDEFGHI..." placeID="4" />
        <Recommendation name="Cafe" pref="3.0" explain="ABCDEFGHJ..." placeID="5" />
      </div>
    );
  }
});

var RecommendsBox = React.createClass({
  render: function() {
    return (
      <div className="RecommendsBox">
        <div className="RecommendsBox1" style={{clear:"both", padding:"25px"}}>
          <h2>Recommend for you</h2>
          <RecommendBox />
        </div>
        <div className="RecommendsBox2" style={{clear:"both", padding:"25px"}}>
          <h2>Recommend for woman</h2>
          <RecommendBox />
        </div>
        <div className="RecommendsBox3" style={{clear:"both", padding:"25px"}}>
          <h2>Recommend for twenties</h2>
          <RecommendBox />
        </div>
      </div>
    );
  }
});

var FullMain = React.createClass({
  render: function() {
    return (
      <div className="MainPage">
        <MenuBar />
        <SearchBox />
        <RecommendsBox />
      </div>
    );
  }
});

ReactDOM.render(
  <FullMain />,
  document.getElementById('content')
);

