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
        width: 1300,
        height: 200,
//        overflowY: 'auto',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        flex: 1
    },
};

const category = "Recommended";

const tilesData = [
    {
        img: 'images/github.png',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'images/blank.png',
        title: 'Breakfast',
        author: 'jslim',
    },
    {
        img: 'images/success.png',
        title: 'Breakfast',
        author: 'coinse',
    },
    {
        img: 'images/seolark.png',
        title: 'Breakfast',
        author: 'jjsohn',
    },
    {
        img: 'images/fail.png',
        title: 'breakfast',
        author: 'scv',
    },
    {
        img: 'images/netflix.png',
        title: 'breakfast',
        author: 'scv',
    },
];

const tilesData2 = [
    {
        img: 'images/github.png',
        title: 'Breakfast',
        author: 'jill111',
    },
    {
        img: 'images/blank.png',
        title: 'Breakfast',
        author: 'jslim',
    },
    {
        img: 'images/success.png',
        title: 'Breakfast',
        author: 'coinse',
    },
    {
        img: 'images/seolark.png',
        title: 'Breakfast',
        author: 'jjsohn',
    },
    {
        img: 'images/fail.png',
        title: 'breakfast',
        author: 'scv',
    },
    {
        img: 'images/netflix.png',
        title: 'breakfast',
        author: 'scv',
    },
];

const data = [tilesData, tilesData2];

export default class MySiteList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <GridList
                cellHeight={200}
                cols={7}
                style={styles.gridList}
            >
                <Subheader style={{fontSize: 20}}>Recommended</Subheader>
                {this.props.data.map((tile) => (
                    <GridTile
                        key={tile.img}
                        title={tile.title}
                        subtitle={<span>by <b>{tile.author}</b></span>}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <img src={tile.img}/>
                    </GridTile>
                ))}
            </GridList>
        );
    }
}