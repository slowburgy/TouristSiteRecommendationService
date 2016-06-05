import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import ToggleStar from 'material-ui/svg-icons/toggle/star';
import {dp, horizontalDP, verticalDP} from '../dimensions/dimensions';
import {grey50} from 'material-ui/styles/colors';
import {_} from 'underscore/underscore';
import FlatButton from 'material-ui/FlatButton';


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
        // fontSize: dp(40)
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

const noCols = 1; // parseInt(window.innerWidth / styles.cellHeight);


export default class MyLikedPlaces extends React.Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.expandStars = this.expandStars.bind(this);
        this.handleRemove = this.handleRemove.bind(this);

        // User data is fetched from the server HERE.
        this.state = {
            tiles: [
                {
                    img: 'images/github.png',
                    title: 'Breakfast',
                    author: 'jill111',
                    starRating: 3
                },
                {
                    img: 'images/blank.png',
                    title: 'Breakfast',
                    author: 'jslim',
                    starRating: 0
                },
                {
                    img: 'images/success.png',
                    title: 'Breakfast',
                    author: 'coinse',
                    starRating: 4
                },
                {
                    img: 'images/seolark.png',
                    title: 'Breakfast',
                    author: 'jjsohn',
                    starRating: 5
                },
                {
                    img: 'images/fail.png',
                    title: 'breakfast',
                    author: 'scv',
                    starRating: 3
                },
                {
                    img: 'images/netflix.png',
                    title: 'breakfast',
                    author: '2',
                    starRating: 2
                },
                {
                    img: 'images/highscore1.png',
                    title: 'breakfast',
                    author: '1',
                    starRating: 1
                }
            ]
        }
    }

    handleRemove(index) {
        console.log(index);

        this.state.tiles.splice(index, 1);
        this.setState({
            tiles: this.state.tiles
        });
    }

    handleToggle() {
        console.log("Toggled!");
    }

    expandStars(e, tile) {
        if (e < tile.starRating) {
            return <ToggleStar color="yellow" />
        } else {
            return <StarBorder color="white" />
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
                        <Subheader style={styles.subheaderStyle}>Places I Liked</Subheader>
                        {this.state.tiles.map(function(tile, index) {
                            var boundRemove = this.handleRemove.bind(this, index);

                            return (
                                <GridTile
                                    key={tile.author}
                                    title={tile.title}
                                    subtitle={<span>by <b>{tile.author}</b></span>}
                                    actionIcon={
                                        <div style={styles.starsStyle} >
                                            {
                                                _.range(5).map((e) => (
                                                    this.expandStars(e, tile)
                                                ))
                                            }
                                            <FlatButton
                                                label="Remove from Favorites"
                                                labelStyle={styles.buttonStyle}
                                                onTouchTap={boundRemove}
                                            />
                                        </div>
                                    }
                                    onTouchTap={this.handleToggle}
                                    style={styles.gridTileStyle}
                                >
                                    <img src={tile.img} />
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