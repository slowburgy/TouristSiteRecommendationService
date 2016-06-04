import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import {dp, horizontalDP} from '../dimensions/dimensions';


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
    }
    
    handleToggle() {
        console.log("Toggled!");
    }
    
    render() {
        return (
            <GridList
                cols={noCols}
                style={styles.gridList}
                cellHeight={styles.cellHeight}
                padding={dp(1)}
            >
                <Subheader style={styles.subheaderStyle}>Recommended</Subheader>
                {this.props.data.map((tile) => (
                    <GridTile
                        key={tile.author}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        titleBackground={styles.titleStyle}
                        onTouchTap={this.handleToggle}
                        style={styles.gridTileStyle}
                    >
                        <img src={tile.img} />
                    </GridTile>
                ))}
            </GridList>
        );
    }
}