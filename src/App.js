import {  createMuiTheme, makeStyles, ThemeProvider  ,withStyles} from '@material-ui/core/styles';
import './App.css';
import{BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LandingPage from './LandingPage';


import Container from '@material-ui/core/Container';

import  React, {useState}  from 'react';
import { MoralisProvider } from "react-moralis";
import AppNav from "./appnav";
import Profile from './Profile';
import Manage from './Manage';
import ManageDetails from './managedetails';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "rgba(0,0,0, 0.9)",
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  largeIcon: {
    width: 160,
    height: 160,
  },

  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: "rgba(0,0,0, 0.9)",
 
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
   container: {
    flex:1,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: 0,
    paddingRight:0  
  },
}));

const Theme = {
  palette: {
    primary: {  // primary color
    contrastText: "#FFFFFF",
    main:"rgb(0, 220, 45)",  // Green
    
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    

  },
  text: {
      primary:"rgba(255, 201, 5, 1)",
     /* secondary: styles.tt,
      disabled: styles.ttt,
      hint: styles.tttt,*/
      
    },
    action: {
     hover :"rgba(255, 201, 5, .5)"
    }

   
  }
};
function App() {
  const classes = useStyles();
  const theme = createMuiTheme(Theme);
 

    const appID = process.env.REACT_APP_MORALIS_APPLICATION_ID ;
    const serverUrl = process.env.REACT_APP_MORALIS_SERVER_URL;
  return (
   
<MoralisProvider appId={appID} serverUrl={serverUrl}>

    <div >

       <ThemeProvider theme={theme}>
      
       <Router>
        <Switch>
    <div className={classes.content}>
    <AppNav />

    <div  />
    <Container maxWidth="md" className={classes.container}>

     <Route exact path="/" component={LandingPage} />
     <Route exact path="/profile" component={Profile} />
     <Route exact path="/manage" component={Manage} />
     <Route  path="/managedetails/:id" component={ManageDetails} />
     </Container>
    </div>

    

      </Switch>
        </Router>
        </ThemeProvider>
     
    </div>
    </MoralisProvider>
  );
}

export default App;
