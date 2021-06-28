import React, { useState,useEffect,useRef } from 'react'
import { useHistory } from "react-router-dom";
import { useMoralis } from "react-moralis";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm ,Controller } from "react-hook-form";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
   
    largeIcon: {
      width: 100,
      height: 100,
    },
  
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: "white"
      ,
      "border-radius": "15px",
      border: "2px solid #73AD21"

    },
    avatar: {
        margin: theme.spacing(1),
        width: 90,
      height: 90,
      cursor: "pointer",

      },
      profileHeader: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        paddingBottom: "30px"
  
      },
  }));
  

export default function Profile() {

   
      
  const history = useHistory();
  const { isInitialized,user,setUserData, isAuthenticated,Moralis} = useMoralis();
  const classes = useStyles();
  const [signupSuccess, setSignupSuccess] = React.useState(false);
  const [signupError, setSignupError] = React.useState(false);
  const [saveErrorMessage,setSaveErroMessage] = useState("");
  const [saveSuccessMessage,setSaveSuccessMessage] = useState("");
  const [firstName,setFirstName] = useState(null);
  const [lastName,setLastName] = useState(null);
  const [email,setEmail] = useState(null);
  const [gotUserData,setGotUserData] = useState(false);
  const profilePicRef = useRef("");
  const [profilePicUrl,setProfilePicUrl] =  useState("");
  const {reset,setValue,watch,control,handleSubmit,formState: { errors }} = useForm({defaultValues:{
    firstName: "",
    lastName: "",
    email:"",
    confirmEmail:""
  }});
  const queryUser = new Moralis.Query("User");

  useEffect (() => {
      if(user)
      {
        if(isInitialized)
        queryUser.first().then(function(results){
            if(results != undefined)
            {
              
                  setGotUserData(true);
                  setValue("firstName", results.get("firstname"));
                  setValue("lastName", results.get("lastname"));
                  setValue("email",results.get("email"));
                  setProfilePicUrl(results.get("ipfs"));
            }
               
         });
        
      }
  },[user,isInitialized,reset]);

  const _handleSubmit = (data,e) => {

    setUserData( {firstname:data.firstName,lastname:data.lastName,email:data.email}).then(function(results) {
        setSaveSuccessMessage("Your profile has been updated successfully!");
        setSignupSuccess(true);
       
      }).catch((error) => {
       // alert(JSON.stringify(error));
       setSaveErroMessage(" Error creating user! "+error.message);
         setSignupError(true);
      });

   
  };

  

  const handleSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSignupSuccess(false);
  };


  const handleSignupErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSignupError(false);
  };

  const profileClicked = (event) => {
    profilePicRef.current.click(); 
  };
  const fileSelected = async (event) => {
    alert(profilePicRef.current.files[0].name); 
    console.log(profilePicRef.current.files[0])
    // Save file input to IPFS
    const data = profilePicRef.current.files[0];
    const file = new Moralis.File(data.name, data);
    await file.saveIPFS();

    setUserData( {ipfs:file.ipfs(),hash:file.hash}).then(function(results) {
        setSaveSuccessMessage("Your profile picture has been updated successfully!");
        setSignupSuccess(true);
        setProfilePicUrl(file.ipfs());
       
      }).catch((error) => {
       // alert(JSON.stringify(error));
       setSaveErroMessage(" Error saving profile picture "+error.message);
         setSignupError(true);
      });
  };

  if(!isAuthenticated)
     history.push("/");

    return (
        <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
       <div className={classes.profileHeader}> <Avatar className={classes.avatar} onClick={profileClicked} src={profilePicUrl}/>

        <input type="file"   accept="image/png, image/jpeg"  ref={profilePicRef} hidden="true" onChange={fileSelected}/>
        <Typography component="h1" variant="h5">
         My Profile
        </Typography> </div>
        <form className={classes.form} noValidate onSubmit={handleSubmit(_handleSubmit)} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <Controller render={({field: {onChange,onBlur, value, name, ref },fieldState:{error}}) => (<TextField onChange={onChange} value={value} label="First Name"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null}  
            />)} name="firstName"  control={control}  rules={{required: 'First Name is required'}}  />
               

            </Grid>
            <Grid item xs={12} sm={6}>
            <Controller render={({field: {onChange,value},fieldState:{error}}) => (
                <TextField onChange={onChange} value={value} label="Last Name"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null} 
                />)} 
                name="lastName"  control={control}  
                rules={{required: 'Last Name is required'}} 
                />
            </Grid>
            <Grid item xs={12}>
              
              <Controller render={({field: {onChange,value},fieldState:{error}}) =>( 
                         <TextField type="email" onChange={onChange} value={value} label="Email Address"  
                          fullWidth variant="outlined"  error={!!error}    
                          helperText={error ? error.message : null} 
                          />)}
                name="email"  control={control} defaultValue="" rules={{required: 'Email Address is required',  pattern: {
                value: /\S+@\S+.\S+/,
                message: "Entered value does not match email format"
              }}} />

            </Grid>
            <Grid item xs={12}>

            <Controller render={({field: {onChange,value},fieldState:{error}}) =>( 
                         <TextField type="email" onChange={onChange} label="Confirm Email Address"  
                          fullWidth variant="outlined"  error={!!error}    
                          helperText={error ? error.message : null} 
                          />)}
                name="confirmEmail"  control={control} defaultValue="" rules={{required: 'Email Address is required',  pattern: {
                value: /\S+@\S+.\S+/

                ,
                message: "Invalid email format."
              }, validate: value =>
              value === watch('email') || "The emails do not match"}} />
             
            </Grid>
            <Grid item xs={12}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {!gotUserData}
          >
           Save Profile
          </Button>
                </Grid>
          </Grid>
        
          <Grid container justify="flex-end">
            <Grid item>
            
              <Snackbar open={signupSuccess} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleSuccessClose} severity="success" elevation={6} variant="filled"> 
                 {saveSuccessMessage}
                </MuiAlert>
               </Snackbar>

               <Snackbar open={signupError} autoHideDuration={6000} onClose={handleSignupErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleSignupErrorClose} severity="error" elevation={6} variant="filled">
                  {saveErrorMessage}
                </MuiAlert>
               </Snackbar>
            </Grid>
          </Grid>
        </form>
      </div>
     
    </Container>
 
    )
  
}
