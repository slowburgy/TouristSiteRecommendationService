import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import {dp, horizontalDP, appBarHeight} from '../dimensions/dimensions';
import RaisedButton from 'material-ui/RaisedButton';
import SocialSentimentDissatisfied from 'material-ui/svg-icons/social/sentiment-dissatisfied';
import SocialSentimentSatisfied from 'material-ui/svg-icons/social/sentiment-satisfied';


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
            likes: this.props.places.map((e) => false)
        };
        
        this.handleDislike = this.handleDislike.bind(this);
        this.handleLike = this.handleLike.bind(this);
    }
    
    handleLike(index) {
        this.state.chosens[index] = true;
        this.state.likes[index] = true;
        this.setState(this.state);

        if (index == this.props.places.length - 1) {
            var answers =
                this.props.places
                .filter(
                    (e, i) => this.state.likes[i]
                );
        
            console.log(answers);
            this.props.handlers.redirectToMainPage(answers);
        }
    }
    
    handleDislike(index) {
        this.state.chosens[index] = true;
        this.state.likes[index] = false;
        this.setState(this.state);

        if (index == this.props.places.length - 1) {
            var answers =
                this.props.places
                    .filter(
                        (e, i) => this.state.likes[i]
                    );

            console.log(answers);
            this.props.handlers.redirectToMainPage(answers);
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
                                                primary={this.state.chosens[index] && this.state.likes[index]}
                                                disabled={this.state.chosens[index] && !this.state.likes[index]}
                                            />
                                            <RaisedButton
                                                label="Dislike"
                                                icon={<SocialSentimentDissatisfied />}
                                                onTouchTap={boundDislike}
                                                secondary={this.state.chosens[index] && !this.state.likes[index]}
                                                disabled={this.state.chosens[index] && this.state.likes[index]}
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
                </div>
                <div style={styles.filler}></div>
            </div>
        );
    }
}


