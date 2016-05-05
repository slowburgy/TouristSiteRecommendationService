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

var Main = React.createClass({
    render() {
        return (
            <div className="main">
                <MenuBar/>
                <table>
                    <tr>
                        <th><PlaceBar/></th>
                        <th></th>
                    </tr>
                </table>
            </div>
        );
    }
});

var OverviewPage = React.createClass({
   render() {
       
   }


});







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



var PlaceBar = React.createClass({
    render() {
        return (
            <Nav bsStyle="pills" stacked activeKey={1}>
                <NavItem eventKey={1} style={{ fontSize: 25 }}>KAIST</NavItem>
                <NavItem eventKey={2} href="#">Overview</NavItem>
                <NavItem eventKey={3} href="#">Snapshots</NavItem>
                <NavItem eventKey={4} href="#">Reviews</NavItem>
                <NavItem eventKey={5} href="#">Additional Information</NavItem>
            </Nav>
        );
    }
});

ReactDOM.render(<Main />, mountNode);
















