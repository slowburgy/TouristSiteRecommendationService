import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {appBarHeight} from '../dimensions/dimensions';
import MyLoginAppBar from './myLoginAppBar';
import MyLoginPage from './myLoginPage';

injectTapEventPlugin();


const muiTheme = getMuiTheme({
    appBar: {
        height: appBarHeight
    }
});

class Main extends React.Component {
    constructor(props) {
        super(props);

        this.handleLoginButtonClick = this.handleLoginButtonClick.bind(this);
        this.authorizeUser = this.authorizeUser.bind(this);
    }

    handleLoginButtonClick() {
        var [uid, firstLogin] = this.authorizeUser();
        
        if (firstLogin) window.location.href="select_favorites.html"; 
        else this.state.info.bodyPage = "main.html";
    }
    
    authorizeUser() {
        /*
         TODO: Routine for OAuth verification and server communication goes here. Save uid in sessionStorage for further use.
         ...
         @return: _uid_, a string, and _firstLogin_, a boolean flag to check whether the user is new to our service.
         */

        var uid = 1, firstLogin = true;
        
        window.sessionStorage.uid = uid;
        
        return [uid, firstLogin];
    }

    render() {
        const appBarHandlers = {
            handleLoginButtonClick: this.handleLoginButtonClick,
        };

        const bodyHandlers = {
        };

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div > 
                    <MyLoginAppBar
                        handlers={appBarHandlers}
                    />
                    <div>
                        <MyLoginPage />
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Main />,
    document.getElementById('app')
);













