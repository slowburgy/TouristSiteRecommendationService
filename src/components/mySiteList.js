import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import {dp, horizontalDP} from '../../dimensions/dimensions';
import SocialPoll from 'material-ui/svg-icons/social/poll';


const styles = {
    gridList: {
        margin: dp(0)
    },
    
    cellHeight: horizontalDP(140),
    titleStyle: "linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)",
    
    gridTileStyle: {
        margin: dp(0),
        cursor: 'pointer'
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
    }
    
    handlePlaceClick(place) {
        this.props.handlers.handlePlaceClick(place);
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
                            var boundClick = this.handlePlaceClick.bind(this, place);

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

