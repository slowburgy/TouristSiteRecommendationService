import React from 'react';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {recommended, recommendedForGender, recommendedForAge, recommendedForNationality} from '../strings/strings';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import {Tabs, Tab} from 'material-ui/Tabs';


const style = {
    height: 500,
    // display: 'fixed', // Makes div/Paper fill the whole page
    // justifyContent: 'center',
    // margin: 10,
    // marginLeft: 100,
    // marginRight: 100,
    // marginTop: 0,
    display: 'inline-block',
    // position: 'fixed',
    // alignSelf: 'right'
};


const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400
    }
};

export default class MyMainPageTab extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {value: "a"}
    }

    handleToggle(value) {
        console.log("Toggled! " + value);
    }

    render() {
        return (
            <Tabs
                value={this.state.value}
                onChange={this.handleToggle}
            >
                <Tab label={recommended} value="a" ></Tab>
                <Tab label={recommendedForAge} value="b"></Tab>
                <Tab label={recommendedForGender} value="b"></Tab>
                <Tab label={recommendedForNationality} value="b"></Tab>
            </Tabs>
        );
    }
}


// export default class MyMainPageTab extends React.Component {
//
//     constructor(props) {
//         super(props);
//         this.handleToggle = this.handleToggle.bind(this);
//     }
//
//     handleToggle() {
//         console.log("Toggled!");
//     }
//
//     render() {
//         return (
//             <Paper zDepth={2} style={style}>
//                 <List>
//                     <Subheader>Menus</Subheader>
//                     <ListItem primaryText={recommended} leftIcon={<ContentInbox />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={recommendedForGender} leftIcon={<ActionGrade />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={recommendedForAge} leftIcon={<ContentSend />} onTouchTap={this.handleToggle} />
//                     <ListItem primaryText={recommendedForNationality} leftIcon={<ContentDrafts />} onTouchTap={this.handleToggle} />
//                 </List>
//             </Paper>
//         );
//     }
// }
