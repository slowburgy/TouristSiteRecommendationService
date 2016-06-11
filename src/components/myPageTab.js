import React from 'react';
import Paper from 'material-ui/Paper';
import {myLikes, myReviews, myVisitedPlaces, changeProfileInfo} from '../../strings/strings';
import {Tabs, Tab} from 'material-ui/Tabs';
import {appBarHeight} from '../../dimensions/dimensions';
import {grey200, grey800} from 'material-ui/styles/colors';
import MyPage from './myPage';


const styles = {
    paperStyle: {
        opacity: 0,
        height: appBarHeight
    },
    
    tabStyle: {
        backgroundColor: grey200,
        color: grey800,
    }
};


export default class MyPageTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: "liked places"};
        this.handleMyPageTabSelection = this.handleMyPageTabSelection.bind(this);
    }

    handleMyPageTabSelection(value) {
        this.setState({value: value})
    }

    render() {
        return (
            <div>
                <div>
                    <Paper style={styles.paperStyle}></Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleMyPageTabSelection}
                    >
                        <Tab label={myLikes} value="liked places" style={styles.tabStyle}></Tab>
                        <Tab label={myReviews} value="reviews" style={styles.tabStyle}></Tab>
                        <Tab label={changeProfileInfo} value="profile" style={styles.tabStyle}></Tab>
                    </Tabs>
                </div>
                <MyPage 
                    info={this.props.info}
                    handlers={this.props.handlers}
                    myPage={this.state.value}
                />
            </div>
        );
    }
}

