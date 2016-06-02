import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
    root: {
        // display: 'inline-block',
        // verticalAlign: 'top'
        // flexWrap: 'wrap',
        // justifyContent: 'space-around',
    },
    gridList: {
        // width: 1300,
        // height: 200,
        // overflowY: 'auto',
        margin: 0        
        // alignSelf: 'stretch',
        // alignItems: 'stretch',
        // flex: 1
    }
};
// cellHeight={200}
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
                cols={7}
                style={styles.gridList}
            >
                <Subheader style={{fontSize: 20}}>Recommended</Subheader>
                {this.props.data.map((tile) => (
                    <GridTile
                        key={tile.author}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                        onTouchTap={this.handleToggle}
                        style={{margin: 0}}
                    >
                        <img src={tile.img} />
                    </GridTile>
                ))}
            </GridList>
        );
    }
}