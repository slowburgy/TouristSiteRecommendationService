var mountNode = document.getElementById("content");

var Nav = ReactBootstrap.Nav,
    NavItem = ReactBootstrap.NavItem,
    Navbar = ReactBootstrap.Navbar,
    NavDropdown = ReactBootstrap.NavDropdown,
    MenuItem = ReactBootstrap.MenuItem,
    Button  = ReactBootstrap.Button;

var ourCoolServiceName = "CoolService";


const MenuBar = React.createClass({
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
                <Nav bsStyle="tabs">
                    <NavDropdown eventKey={1} title="Popular places" id="popular_dropdown">
                        <MenuItem eventKey={1.1} onSelect={this.handleSelect}>Seoul</MenuItem>
                        <MenuItem eventKey={1.2} onSelect={this.handleSelect}>Daejeon</MenuItem>
                        <MenuItem eventKey={1.3} onSelect={this.handleSelect}>Busan</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={1.3} onSelect={this.handleSelect}>Popular places</MenuItem>
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

ReactDOM.render(<MenuBar />, mountNode);
















