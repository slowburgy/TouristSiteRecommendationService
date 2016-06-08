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
import {horizontalDP, verticalDP, dp} from '../dimensions/dimensions';
import MyPlacePageTab from './myPlacePageTab';
import {mapWeatherContainerHeight, mapWeatherContainerWidth, placePageTab, appBarHeight} from '../dimensions/dimensions';
import {grey50} from 'material-ui/styles/colors';


const styles = {
    root: {
        backgroundImage: 'url("images/seolark_highres.jpg")',
        width: horizontalDP(1000),
        height: verticalDP(1000),
        backgroundSize: horizontalDP(1000),
        position: 'fixed',
        // top: appBarHeight,
    },
};


export default class MyPlacePage extends React.Component {
    
    render() {
        return (
            <div style={styles.root}>
                <MyPlacePageTab />
            </div>
        );
    }
}







