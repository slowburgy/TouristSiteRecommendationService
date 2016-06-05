import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import {dp, horizontalDP} from '../dimensions/dimensions';
import Snackbar from 'material-ui/Snackbar';


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

        this.handleToggle = this.handleToggle.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.displayLike = this.displayLike.bind(this);
        
        this.state = {
            states: this.props.data.map(function (d) {
                return false;
            })
        }
    }
    
    handleToggle() {
        console.log("Toggled!");
    }

    handleLike(index) {
        var newStates = this.state.states;
        newStates[index] = !newStates[index];

        this.setState({states: newStates});
        // console.log(this.state.states);
    }
    
    displayLike(index) {
        if (this.state.states[index]) {
            return <ActionFavorite color="white" />;
        } else {
            return <ActionFavoriteBorder color="white" />;
        }
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
                    {this.props.data.map(function(tile, index) {
                        var boundLike = this.handleLike.bind(this, index);

                        return (
                            <GridTile
                                key={tile.author}
                                title={tile.title}
                                subtitle={<span>by <b>{tile.author}</b></span>}
                                actionIcon={
                                    <IconButton onTouchTap={boundLike} >
                                        {this.displayLike(index)}
                                    </IconButton>
                                }
                                titleBackground={styles.titleStyle}
                                onTouchTap={this.handleToggle}
                                style={styles.gridTileStyle}
                            >
                                <img src={tile.img} />
                            </GridTile>
                        )}.bind(this)
                    )}

                </GridList>
                <div>
                    {this.props.data.map(function(tile, index) {
                        return (
                            <Snackbar
                                open={this.state.states[index]}
                                message={tile.title + " added to your favorites"}
                                autoHideDuration={2000}
                            />
                        )}.bind(this)
                    )}
                </div>
            </div>
        );
    }
}


