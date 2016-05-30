import React from 'react';
import Paper from 'material-ui/Paper';
import MySiteList from './mySiteList';
import Subheader from 'material-ui/Subheader';

const style = {
    display: 'inline-block',
    verticalAlign: 'top',
    height: 1000,
    // margin: 10,
    // alignSelf: 'stretch',
    // alignItems: 'stretch',
    // flex: 1,
};

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
        author: '2',
    },
    {
        img: 'images/highscore1.png',
        title: 'breakfast',
        author: '1',
    },
];

const data = [tilesData, tilesData, tilesData, tilesData];


export default class MyCategoryList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style}>
                {data.map((d) => (
                    <Paper zDepth={1} style={{marginBottom: 20, height: 250}}>
                        <MySiteList data={d} />
                    </Paper>
                ))}
            </div>
        );
    }
}















