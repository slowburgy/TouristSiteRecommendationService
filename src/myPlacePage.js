import React from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Tabs, Tab} from 'material-ui/Tabs';
import {rate, moreSnapshots, review} from '../strings/strings';
import FlatButton from 'material-ui/FlatButton';

const styles = {
    root: {
        marginTop: 30,
        marginLeft: 200,
        marginRight: 200
    },
    
    image: {
        marginTop: 30,
        marginLeft: 50,
        marginRight: 50,
        textAlign: 'center'
    },
    
    imageList: {
        marginLeft: 20,
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    info: {
        marginTop: 30,
        marginLeft: 300,
        marginRight: 300,
        textAlign: 'center'
    },

    weatherTab: {
        marginTop: 30,
        marginLeft: 100,
        marginRight: 100,
        textAlign: 'center'
    },

    weatherInfo: {
        display: 'inline-block',
        textAlign: 'center',
        marginLeft: 50,
        marginRight: 50
    },
    
    weatherIcon: {
        height: 50,
        marginLeft: 20,
        marginRight: 20
    }
};





export default class MyPlacePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };

        this.handleChange = this.handleChange.bind(this);
        this.data = [
            'images/weathericon.png',
            'images/weathericon.png',
            'images/weathericon.png',
            'images/weathericon.png',
            'images/weathericon.png',
        ];
    }
    

    handleChange(event, index, value) {
        this.setState({value});
    }
    
    render() {
        return (
            <Paper style={styles.root} zDepth={0}>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                            <MenuItem value={1} primaryText="All Broadcasts" />
                            <MenuItem value={2} primaryText="All Voice" />
                            <MenuItem value={3} primaryText="Seolark" />
                            <MenuItem value={4} primaryText="Complete Voice" />
                            <MenuItem value={5} primaryText="Complete Text" />
                            <MenuItem value={6} primaryText="Active Voice" />
                            <MenuItem value={7} primaryText="Active Text" />
                        </DropDownMenu>
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton label="Like this place"  />
                        <FlatButton label="Rate this place"  />
                        <FlatButton label="Search Naver blogs" />
                    </ToolbarGroup>
                </Toolbar>

                <Paper style={styles.image} zDepth={0}>
                    <Paper zDepth={0} style={styles.imageList}>
                        <img src="images/seolarkimage.jpg" style={{height: 400}}/>
                    </Paper>
                    <Paper style={styles.imageList} >
                        <img src="images/seolark.png" style={{height: 200}}/>
                    </Paper>
                    
                </Paper>
                <Paper style={styles.info} zDepth={0} >
                    <Subheader>Place Information</Subheader>
                    <Table>
                        <TableBody displayRowCheckbox={false}>
                            <TableRow>
                                <TableRowColumn>Name</TableRowColumn>
                                <TableRowColumn>Mt. Seolark</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Address</TableRowColumn>
                                <TableRowColumn>Gangwondo, something something something j.</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Opening hours</TableRowColumn>
                                <TableRowColumn>08:00 ~ 24:00</TableRowColumn>
                            </TableRow>
                            <TableRow>
                                <TableRowColumn>Star rating</TableRowColumn>
                                <TableRowColumn>Star images</TableRowColumn>
                            </TableRow>
                        </TableBody>
                    </Table>                    
                </Paper>
                <Paper style={styles.weatherTab} zDepth={0}>
                    <Paper style={styles.weatherInfo} zDepth={0}>
                        <Subheader>Weekly Forecasts</Subheader>
                        {this.data.map(function (item) {
                            return <img src={item} style={styles.weatherIcon}/>;
                        })}
                    </Paper>
                    <Paper style={styles.weatherInfo} zDepth={0} >
                        <Subheader>Daily Forecasts</Subheader>
                        {this.data.map(function (item) {
                            return <img src={item} style={styles.weatherIcon}/>;
                        })}
                    </Paper>
                </Paper>
            </Paper>
        );
    }
}
