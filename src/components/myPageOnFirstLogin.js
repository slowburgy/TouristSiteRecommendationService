import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {dp, horizontalDP, appBarHeight} from '../../dimensions/dimensions';
import RaisedButton from 'material-ui/RaisedButton';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

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
        flex: 3,
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
    
    buttonBarStyle: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: dp(20)
    },

    buttonStyle: {
        flex: 1,
        height: dp(60)
    },

    buttonLabelStyle: {
        fontSize: dp(25),
    },
};

const noCols = 1;


export default class MyPageOnFirstLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chosens: this.props.places.map((e) => false),
            likes: this.props.places.map((e) => "neutral"),
            nickname: "",
            age: "",
            gender: "",
            nationality: ""
        };
        
        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleNeutral = this.handleNeutral.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleNatChange = this.handleNatChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.state.nickname = event.target.value;
    }

    handleAgeChange(event) {
        this.state.age = event.target.value;
    }

    handleGenderChange(event) {
        this.state.gender = event.target.value;
    }

    handleNatChange(event) {
        this.state.nationality = event.target.value;
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
    
    handleSubmit() {
        var chosen = this.state.chosens
            .reduce(
                (p, c) => p && c
            );

        if (chosen) {
            var userInfo = {
                nickname: this.state.nickname,
                age: this.state.age,
                gender: this.state.gender,
                nationality: this.state.nationality
            };
            
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
            
            console.log(prefList);
            console.log(userInfo);
            
            // this.props.handlers.redirectToMainPage(prefList, userInfo);
        }
    }
    
    render() {
        const actions = [
            this.handleNameChange,
            this.handleAgeChange,
            this.handleGenderChange,
            this.handleNatChange
        ];

        const categories = [
            "Nickname",
            "Age",
            "Gender",
            "Nationality"
        ];

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
                    <Paper>
                        <Divider />
                        <Table selectable={false}>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    categories.map((e, i) => (
                                        <TableRow>
                                            <TableRowColumn style={styles.fontStyle}>{e}</TableRowColumn>
                                            <TableRowColumn style={styles.fontStyle}>
                                                <TextField style={styles.fontStyle} onChange={actions[i]} />
                                            </TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                        <div style={styles.buttonBarStyle}>
                            <RaisedButton
                                label="Submit"
                                style={styles.buttonStyle}
                                labelStyle={styles.buttonLabelStyle}
                                primary={true}
                                onTouchTap={this.handleSubmit}
                            />
                        </div>
                    </Paper>
                </div>
                <div style={styles.filler}></div>
            </div>
        );
    }
}


