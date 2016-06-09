import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FlatButton from 'material-ui/FlatButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {dp, horizontalDP} from '../dimensions/dimensions';
import Snackbar from 'material-ui/Snackbar';
import SocialPoll from 'material-ui/svg-icons/social/poll';


const styles = {
    gridList: {
        margin: dp(0)
    },
    
    cellHeight: horizontalDP(140),
    titleStyle: "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
    
    gridTileStyle: {
        margin: dp(0)
    },

    subheaderStyle: {
        fontSize: dp(40)
    }
};

const noCols = parseInt(window.innerWidth / styles.cellHeight);


export default class MySiteList extends React.Component {
    constructor(props) {
        super(props);

        this.handlePlaceClick = this.handlePlaceClick.bind(this);
        this.handleFetchPlaceInformation = this.handleFetchPlaceInformation.bind(this);
    }
    
    handleFetchPlaceInformation(placeCID) {
        /*
         Routine for fetching the place information goes here.
         ...
         @return: a JSON object _place_, to update this.state.place in src/index.js
         */
        
        return null;
    }
    
    handlePlaceClick(placeCID) {
        var _place_ = this.handleFetchPlaceInformation(placeCID); 
        this.props.handlers.handlePlaceClick(_place_);
    }

    render() {
        return (
            <div>
                <GridList
                    cols={noCols}
                    style={styles.gridList}
                    cellHeight={styles.cellHeight}
                    padding={dp(1)}
                >
                    <Subheader style={styles.subheaderStyle}>Recommended</Subheader>
                    {
                        this.props.recommendations.map(function(place, index) {
                            var boundClick = this.handlePlaceClick.bind(this, place.cid);

                            return (
                                <GridTile
                                    key={place.cid}
                                    title={place.name}
                                    subtitle={<span> <b>{place.address}</b></span>}
                                    actionIcon={
                                        <IconButton onTouchTap={boundClick} >
                                            <SocialPoll color="white"/>
                                        </IconButton>
                                }
                                    onTouchTap={boundClick}
                                    titleBackground={styles.titleStyle}
                                    style={styles.gridTileStyle}
                                >
                                    <img src={place.img} />
                                </GridTile>
                            )}.bind(this)
                        )
                    }
                </GridList>
            </div>
        );
    }
}

// TODO: add this code to profile page
// <div>
//     {this.props.recommendations.map(function(tile, index) {
//         return (
//             <Snackbar
//                 open={this.state.states[index]}
//                 message={tile.name + " added to your favorites"}
//                 autoHideDuration={2000}
//             />
//         )}.bind(this)
//     )}
// </div>
