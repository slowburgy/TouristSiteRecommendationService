import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {cyan50} from 'material-ui/styles/colors';
import {dp, horizontalDP, verticalDP} from '../../dimensions/dimensions';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {List, ListItem} from 'material-ui/List';
import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: verticalDP(600),
        backgroundImage: 'url("images/hqdefault.jpg")'
    },

    child: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: verticalDP(480),
        marginBottom: verticalDP(30)
    },

    msgStyle: {
        fontSize: dp(50),
        textAlign: 'center',
        marginBottom: dp(30)
    },

    barStyle: {
        flex: 1,
        width: horizontalDP(600),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: cyan50,
        opacity: 0.8,
    },

    buttonsBarStyle: {
        display: 'flex',
        flexDirection: 'row',
    },
    
    buttonStyle: {
        flex: 1,
        fontSize: dp(25),
        fontWeight: 'bold',
    },
 
    listStyle: {
        overflowY: 'auto'
    },
    
    imgURL: 'url("images/hqdefault.jpg")'
};


export default class MyRecommendationBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            currentCategories: []
        };

        this.handleCategoryOpen = this.handleCategoryOpen.bind(this);
        this.handleCategoryChosen = this.handleCategoryChosen.bind(this);
        this.handleCategoryRemove = this.handleCategoryRemove.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleCategoryOpen(event) {
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    handleCategoryChosen(event, menuItem, index) {
        this.state.currentCategories.push(menuItem.props.value);
        this.setState(this.state);
    }
    
    handleCategoryRemove(category) {
        this.state.currentCategories = 
            this.state.currentCategories.filter(
                (e) => e !== category
            );
        this.setState(this.state);
    }

    handleRequestClose() {
        this.setState({
            open: false
        })
    }
    
    handleSubmit() {
        this.props.handlers.fetchRecommendationsFromServer(
            this.state.currentCategories
        )
    }

    render() {
        var strings = this.props.info.strings;
        
        var categories = [
            strings.seoul,
            strings.daejeon,
            strings.busan,
            strings.gwangju,
            strings.daegu,
            strings.ulsan,
            strings.incheon,
            strings.gyeonggi,
            strings.chungcheong,
            strings.jeolla,
            strings.gyeongsang,
            strings.gangwon,
            strings.jeju,
            strings.forAge,
            strings.forGender,
            strings.alone,
            strings.family,
            strings.friends,
            strings.lover,
            strings.company
        ];

        return (
            <div style={styles.root}>
                <div style={styles.child}>
                    <div style={styles.msgStyle}>{strings.msg}</div>
                    <div style={styles.barStyle}>
                        <div style={styles.buttonsBarStyle}>
                            <RaisedButton
                                style={styles.buttonStyle}
                                label={strings.addCat}
                                onTouchTap={this.handleCategoryOpen}
                                primary={true}
                            />
                            <Popover
                                open={this.state.open}
                                onRequestClose={this.handleRequestClose}
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                            >
                                <Menu
                                    maxHeight={verticalDP(450)}
                                    onItemTouchTap={this.handleCategoryChosen} >
                                    {
                                        categories.map(
                                            function (category, index) {
                                                return (
                                                    <MenuItem
                                                        primaryText={category}
                                                        value={category}
                                                    />
                                                )
                                            }.bind(this)
                                        )
                                    }
                                </Menu>
                            </Popover>
                            <RaisedButton 
                                label={strings.submit}
                                style={styles.buttonStyle}
                                secondary={true}
                                onTouchTap={this.handleSubmit}
                            />
                        </div>
                        <List style={styles.listStyle} id="recommendation_categories">
                            {
                                this.state.currentCategories.map(
                                    function(category) {
                                        var boundRemove = this.handleCategoryRemove.bind(this, category);
                                        
                                        return (
                                            <ListItem
                                                primaryText={category}
                                                rightIconButton={
                                                    <IconButton
                                                        onTouchTap={boundRemove}
                                                    >
                                                        <ContentClear />
                                                    </IconButton>
                                                }
                                            />
                                        )
                                    }.bind(this)
                                )
                            }
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}

