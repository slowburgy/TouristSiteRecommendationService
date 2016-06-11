import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {dp, horizontalDP} from '../../dimensions/dimensions';
import {grey50} from 'material-ui/styles/colors';
import {_} from 'underscore/underscore';


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
        fontSize: dp(50),
        marginTop: dp(20),
        marginLeft: dp(20),
        marginRight: dp(20),
        textAlign: 'center',
        backgroundColor: grey50
    },
    
    starsStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: horizontalDP(20)
    },

    buttonStyle: {
        fontWeight: 'bold',
        color: grey50,
        opacity: 0.9
    }
};

const noCols = 1; 


export default class MyLikedPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.handlePlaceClick = this.handlePlaceClick.bind(this);

        this.state = {
            likedPlaces: this.props.info.user.likedPlaces
        }
    }

    handlePlaceClick(place) {
        this.props.handlers.handlePlaceClick(place);
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
                        <Subheader style={styles.subheaderStyle}>{"Places I Liked"}</Subheader>
                        {this.state.likedPlaces.map(function(place) {
                            var boundClick = this.handlePlaceClick.bind(this, place);

                            return (
                                <GridTile
                                    key={place.cid}
                                    title={place.name}
                                    subtitle={<span>by <b>{place.address}</b></span>}
                                    actionIcon={
                                        <div style={styles.starsStyle} >
                                            {
                                                _.range(5).map(function(e) {
                                                    if (e < place.starRating) {
                                                        return <ToggleStar color="yellow" />
                                                    } else {
                                                        return <StarBorder color="white" />
                                                    }
                                                })
                                            }
                                        </div>
                                    }
                                    onTouchTap={boundClick}
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

