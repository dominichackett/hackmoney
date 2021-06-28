import React,{useState} from 'react'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import {   makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import giftImage from "./images/gifts.png";
import carRepairImage from "./images/carrepairs.png";
import creditCardImage from "./images/creditcard.jpg";
import  homeRepairImage from "./images/homerepairs.jpg";
import  vacationImage from "./images/vacation.png";
import  savingsImage from "./images/savings.png";
import  investmentImage from "./images/investment.png";
import  ringImage from "./images/rings.png";
import { useMoralis } from "react-moralis";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   
    largeIcon: {
      width: 70,
      height: 70,
    },
    walletIcon: {
      width: 80,
      height: 80,
    },
    root: {
      flexGrow: 1,
      paddingTop:"90px"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: "rgba(52, 67, 249, 0.15)"
      ,
      '&:hover': {
        "backgroundColor": "rgba(0, 0, 0, 0.4)",     
    },
    },
    walletDiv: {
      display: "flex",
      "align-items": "center",
      "justify-content": "center",
      cursor: "pointer",
      
     
    walletText: {
      "fontSize": "26px",
    "fontWeight": "600",
    color: "rgb(134, 190, 255)",
          
}
    },

    useCaseDiv: {
      display: "flex",
      "align-items": "center",
      "justify-content": "space-between"

    },
    useCaseText: {
      "fontSize": "18px",
    "fontWeight": "500",
    color: "rgb(0, 220, 45);",
    
    },
    
  appBarSpacer: theme.mixins.toolbar,
  }));
  
export default function LandingPage() {
  const classes = useStyles();
  const {  web3,authenticate,logout,isAuthenticated,Moralis} = useMoralis();
  const [dialogSeverity,setDialogSeverity] = useState("success");
  const [messageDialogOpen,setMessageDialogOpen] = useState(false);
  const [dialogMessage,setDialogMessage] = useState("");
  const history = useHistory();
  const connectWallet = async () => {
    const _web3 = await Moralis.Web3.enable();
    _web3.eth.net.getId().then(function(network){
    if(network == 80001)
    {
       Moralis.Web3.getSigningData = () => 'Sou Sou - Peer to Peer Lending Platform. Login Request';
       authenticate();
    }
    else
    {
      setDialogMessage("Error wrong network selected. Please select the Polygon Mumbai Testnet.");
      setDialogSeverity("error");
      setMessageDialogOpen(true);
    }   
  });
   
  };  

  const handleDialogClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setMessageDialogOpen(false);
  };

  if(isAuthenticated)
    history.push("profile");
    
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
        
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}>   <Avatar alt="Gifts" src={giftImage} className={classes.largeIcon}/> <span className={classes.useCaseText}> Gifts</span> </div>
</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar alt="Car Repairs" src={carRepairImage} className={classes.largeIcon}/> <span className={classes.useCaseText}> Auto Repairs</span></div>
</Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
          <div className={classes.useCaseDiv}><Avatar variant="circle" alt="Credit Card Debt" src={creditCardImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Credit Card Debt</span></div> </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar variant="circle" alt="Home Repairs" src={homeRepairImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Home Repairs</span></div></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>   <div className={classes.walletDiv} onClick={connectWallet}>         <AccountBalanceWalletIcon color="primary" className={classes.walletIcon}/>
         <span className={classes.walletText}> Connect Wallet</span> </div>
        </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar variant="circle" alt="Vacation" src={vacationImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Vacation</span></div></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar variant="circle" alt="Savings" src={savingsImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Savings</span></div></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar variant="circle" alt="Investment" src={investmentImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Defi/Investing</span></div></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}><div className={classes.useCaseDiv}><Avatar variant="circle" alt="Wedding" src={ringImage} className={classes.largeIcon}/><span className={classes.useCaseText}>Wedding</span></div></Paper>
        </Grid>
       
      </Grid>
      <Snackbar open={messageDialogOpen} autoHideDuration={10000} onClose={handleDialogClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleDialogClose} severity={dialogSeverity} elevation={6} variant="filled"> 
                {dialogMessage}
                </MuiAlert>
               </Snackbar> 
        </div>
    )
}
