import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {dp, horizontalDP, appBarHeight} from '../../dimensions/dimensions';
import RaisedButton from 'material-ui/RaisedButton';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import MyFirstProfile from './myFirstProfile';

const styles = {
    root: {
        marginTop: dp(20),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    filler: {
        flex: 1,
    },

    gridList: {
        flex: 4,
        margin: dp(0)
    },

    cellHeight: horizontalDP(250),

    gridTileStyle: {
        margin: dp(10),
        cursor: 'pointer'
    },

    subheaderStyle: {
        fontWeight: 'bold',
        fontSize: dp(35),
        margin: dp(25),
        textAlign: 'center',
    },

    secondSubheaderStyle: {
        fontWeight: 'bold',
        fontSize: dp(35),
        margin: dp(25),
        marginTop: dp(50),
        textAlign: 'center',
    },
    
    buttonsStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: horizontalDP(20)
    },
};

const noCols = 1;


export default class MyPageOnFirstLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosens: this.props.places.map((e) => false),
            likes: this.props.places.map((e) => "neutral"),
        };
        
        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleNeutral = this.handleNeutral.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleLike(index) {
        this.state.chosens[index] = true;
        this.state.likes[index] = "like";
        this.setState(this.state);
    }
    
    handleNeutral(index) {
        this.state.chosens[index] = true;
        this.state.likes[index] = "neutral";
        this.setState(this.state);
    }
    
    handleDislike(index) {
        this.state.chosens[index] = true;
        this.state.likes[index] = "dislike";
        this.setState(this.state);
    }
    
    handleSubmit(userInfo) {
        var chosen = this.state.chosens
            .reduce(
                (p, c) => p && c
            );

        if (chosen) {
            var prefList = 
                this.props.places.map(
                    function(place, index) {
                        var score;
                       
                        switch (this.state.likes[index]) {
                            case "like":
                                score = 5;
                                break;
                            case "dislike":
                                score = 1;
                                break;
                            default:
                                score = 3;
                        }
                        
                        return [place.cid, score];
                    }.bind(this)
                );
            
            // console.log(prefList);
            // console.log(userInfo);
            
            this.props.handlers.redirectToMainPage(prefList, userInfo);
        } else {
            window.alert("Please rate all places.");
        }
    }
    
    render() {
        return (
            <div style={styles.root}>
                <div style={styles.filler} ></div>
                <div style={styles.gridList}>
                    <GridList
                        cols={noCols}
                        cellHeight={styles.cellHeight}
                        padding={dp(20)}
                    >
                        <Subheader style={styles.subheaderStyle}>{"Please rate the following places before proceeding"}</Subheader>
                        {this.props.places.map(function(place, index) {
                            var boundLike = this.handleLike.bind(this, index);
                            var boundDislike = this.handleDislike.bind(this, index);
                            var boundNeutral = this.handleNeutral.bind(this, index);
                            
                            return (
                                <GridTile
                                    key={place.cid}
                                    title={place.name}
                                    subtitle={<span>by <b>{place.address}</b></span>}
                                    titlePosition="top"
                                    actionIcon={
                                        <div style={styles.buttonsStyle} >
                                            <RaisedButton
                                                label="Like"
                                                icon={<SocialSentimentSatisfied />}
                                                style={{marginRight: dp(5)}}
                                                onTouchTap={boundLike}
                                                primary={this.state.chosens[index] && (this.state.likes[index] == "like")}
                                                disabled={this.state.chosens[index] && (this.state.likes[index] !== "like")}
                                            />
                                            <RaisedButton
                                                label="Dislike"
                                                icon={<SocialSentimentDissatisfied />}
                                                style={{marginRight: dp(5)}}
                                                onTouchTap={boundDislike}
                                                secondary={this.state.chosens[index] && (this.state.likes[index] == "dislike")}
                                                disabled={this.state.chosens[index] && (this.state.likes[index] !== "dislike")}
                                            />
                                            <RaisedButton
                                                label="Unsure"
                                                icon={<SocialSentimentNeutral />}
                                                onTouchTap={boundNeutral}
                                                primary={this.state.chosens[index] && (this.state.likes[index] == "neutral")}
                                                disabled={this.state.chosens[index] && (this.state.likes[index] !== "neutral")}
                                            />
                                        </div>
                                    }
                                    style={styles.gridTileStyle}
                                >
                                    <img src={place.img} />
                                </GridTile>
                            )}.bind(this)
                        )}
                    </GridList>
                    <Subheader style={styles.secondSubheaderStyle}>{"Please provide information about yourself"}</Subheader>
                    <MyFirstProfile
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <div style={styles.filler}></div>
            </div>
        );
    }
}


