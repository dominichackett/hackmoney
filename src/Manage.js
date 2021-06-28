import { useMoralis } from "react-moralis";
import { useHistory } from "react-router-dom";
import React, { useState,useEffect,useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {   makeStyles } from '@material-ui/core/styles';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import NumberFormat from 'react-number-format';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CreateIcon from '@material-ui/icons/Create';
import {useForm ,Controller } from "react-hook-form";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
  import MenuItem from '@material-ui/core/MenuItem';
  import Dialog from '@material-ui/core/Dialog';
  import DialogActions from '@material-ui/core/DialogActions';
  import DialogContent from '@material-ui/core/DialogContent';
  import DialogContentText from '@material-ui/core/DialogContentText';
  import DialogTitle from '@material-ui/core/DialogTitle';
  import { SOUSOU_ADDRESS, SOUSOU_ABI } from "./contracts";
  import { format,setHours,setMinutes,setSeconds} from 'date-fns';
  import TablePagination from '@material-ui/core/TablePagination';
  
  import EventNoteIcon from '@material-ui/icons/EventNote';

const useStyles = makeStyles((theme) => ({
   
    largeIcon: {
      width: 50,
      height: 50,
    },
    sousouIcon:{
    width: 50,
    height: 50,
    color : "rgb(145, 144, 143)"
},
    root: {
        flexGrow: 1,
        paddingTop:"10px"
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        backgroundColor: "rgba(52, 67, 249, 0.15)"
        
    },
    paperCreate: {
        padding: "15px",
        textAlign: 'left',
        backgroundColor: "rgba(52, 67, 249, 0.15)"
        
    },
    paperSouSou:
    {
        padding: "15px",
        textAlign: 'left',
        backgroundColor: "rgba(52, 67, 249, 0.15)",
        "border-radius": "10px",
       border: "1px solid rgb(0, 220, 45)"
    },
    sousouHeader: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        paddingBottom: "5px"
  
      },
      
    headerText: {
      "fontSize": "20px",
    "fontWeight": "500",
    color: "rgb(134, 190, 255);",
    "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "WebkitFontSmoothing": "antialiased",
    "lineHeight": "1.5",
   
    },
    headerNumber: {
        "fontSize": "25px",
      "fontWeight": "600",
      color: "rgb(255, 255, 255);",
      "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      "WebkitFontSmoothing": "antialiased",
      "lineHeight": "1.5",
      
      },

      numberDiv1: {
       width:"50%",
       

      },

      numberDiv: {
        width:"50%",
        float:"right"
       },
       headerMoney: {
        "fontSize": "25px",
      "fontWeight": "600",
      color: "rgb(0, 220, 45)",
      "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      "WebkitFontSmoothing": "antialiased",
      "lineHeight": "1.5",
      
      },
      formCreate: 
      { backgroundColor: '#cfe8fc', 
      padding:"20px"
    },
        root2: {
         
      
        
        "& .MuiFormHelperText-root":
        {
            color:"red"
        },  
        "& .MuiInputBase-root": {
          padding: 0,
          marginRight:"6px",
         
          "& .MuiButtonBase-root": {
            padding: 0,
            paddingLeft: 10,
            color:theme.palette.primary.main

            ,
           
            "&.Mui-focusVisible":
          {
            color:theme.palette.primary.main
          },
          },
          
          
          "& .MuiInputBase-input": {
            padding: 15,
            paddingLeft: 0,
           
          
          } ,"& .MuiInputBase-input:focus": {
            padding: 15,
            paddingLeft: 0,
            
          }
        },
        "& .MuiInputLabel-root":
    {
        "&.Mui-focused":
    {
    },
       
    },
    
    '& .MuiInput-underline:before': {
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: theme.palette.primary.main
      , // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor:        theme.palette.primary.main
      , // Solid underline on focus
    }
        },
        sousouHeaderText: {
            "fontSize": "15px",
          "fontWeight": "500",
          color: "rgb(255, 255, 255);",
          "text-transform": "uppercase",
          "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  "WebkitFontSmoothing": "antialiased",
  "MozOsxFontSmoothing": "grayscale"
          },

          sousouDiv: {
            display: "flex",
            "align-items": "center",
            "justify-content": "space-between",
            paddingBottom: "5px",
            marginTop:"6px"
          },

     detailsText:
     {
        color : "rgb(145, 144, 143)"
     }

  }));
  
  function SouSou(props) {
    const classes = useStyles();
    const history = useHistory();
  return(<React.Fragment>
            <Grid item xs={12} sm={4}>
            <Paper className={classes.paperSouSou}>
  
                <span className={classes.sousouHeaderText}>{props.row.name}</span>
                <div className={classes.sousouDiv}><span className={classes.detailsText}>Frequency</span><span>{props.row.frequency}</span></div>
                <div className={classes.sousouDiv}><span className={classes.detailsText}>Hands</span><span>{props.row.hands}</span></div>
                <div className={classes.sousouDiv}><span className={classes.detailsText}>Amount</span><span><NumberFormat value={props.row.amount}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span></div>
                <div className={classes.sousouDiv}><span className={classes.detailsText}>Total Paid Per Hand</span><span><NumberFormat value={props.row.handtotal}  displayType={'text'} thousandSeparator={true} prefix={'$'} /></span></div>

                <div className={classes.sousouDiv}><span className={classes.detailsText}>Start Date</span><span>{format(new Date(props.row.startDate),"iii do MMM yyyy p")}</span></div>
                <div className={classes.sousouDiv}><Button  variant="contained"
            color="primary" onClick={() => history.push(`/managedetails/${props.row.sousou}`)}>View</Button><EventNoteIcon className={classes.sousouIcon} /></div>
             </Paper>   
           </Grid>
  </React.Fragment>);
  }
export default function Manage() {
    const { isInitialized,user,setUserData, isAuthenticated,Moralis} = useMoralis();
    const history = useHistory();
    const classes = useStyles();
    const [createErrorMessage,setCreateErroMessage] = useState("");
    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [confirmDialogSeverity,setConfirmDialogSeverity] = useState("info");
    const [confirmDialogMessage,setConfirmDialogMessage] = useState("");
    const [confirmMessageDialogOpen,setConfirmMessageDialogOpen] = useState(false);
    const [dialogSeverity,setDialogSeverity] = useState("success");
    const [messageDialogOpen,setMessageDialogOpen] = useState(false);
    const [dialogMessage,setDialogMessage] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [createSuccessMessage,setCreateSuccessMessage] = useState("");
    const web3 = useRef(null); 
    const sousouContract = useRef(null);
    const [noRows,setNoRows] = useState(0);
    const [_rows,setRows] = useState([]);
    const[isCreating,setIsCreating] = useState(false);
    const [newSouSou,setNewSouSou] = useState(new Date());
    const [handTotals, setHandTotals] = useState(0);

    const queryCreatedSouSou= new Moralis.Query("CreatedSouSou");
    useEffect (() => {
        queryCreatedSouSou.descending("createdDate");
        queryCreatedSouSou.skip(page*rowsPerPage);
        queryCreatedSouSou.limit(rowsPerPage);
       if(user)
       { 
        queryCreatedSouSou.equalTo("owner",user.get("ethAddress"));

        if(isInitialized)
        {   
            queryCreatedSouSou.count().then(function(count){
                setNoRows(count);
             });
             queryCreatedSouSou.find().then(function(results){
                if(results != undefined)
                {
                    var sousous = [];
                    var freq = ["","Weekly","Fortnightly","Monthly"];
                    results.forEach(function(value)
                    {
                        sousous.push({
                            sousou: parseInt(value.get("sousou")),
                            name:value.get("name"),
                            frequency: freq[parseInt(value.get("distribution"))],
                            hands: value.get("numberOfHands"),
                            amount: value.get("amount"),
                            handtotal: parseInt(value.get("amount"))*parseInt(value.get("numberOfHands")),
                            startDate: parseInt(value.get("startDate"))

                        });
                    });

                    setRows(sousous);

                }

             });


        }
    }
    },[user,isInitialized,newSouSou]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };

      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };

    const {reset,setValue,getValues,watch,control,handleSubmit,formState: { errors }} = useForm({defaultValues:{
        name: "",
        distribution: 1,
        numberOfHands:52,
        amount:100
      }});

     //Get Web3 Instance
      useEffect(() => {
        async function getWeb3(){
           web3.current =  await Moralis.Web3.enable();
           sousouContract.current =new web3.current.eth.Contract(SOUSOU_ABI,SOUSOU_ADDRESS); 
        }
        getWeb3();
    },[]);   


    //Get Sou Sou Hand Totals for user
useEffect (() => {
    if(isInitialized && user)
    { 
         const params =  {userAddress:user.get("ethAddress").toLowerCase() };
         Moralis.Cloud.run("getSouSouTotals", params).then(function(results){
            if(results.length > 0)
             setHandTotals(parseInt(results[0].total));  
         }).catch(function(error){
  
         });
    }
  },[user,isInitialized,newSouSou]); 


    const createSouSou = () => {

        setDialogMessage("Awaiting User Approval and Confirmations");
        setDialogSeverity("info");
        setMessageDialogOpen(true);
        setIsCreating(true);
        let startDate = new Date(getValues("startDate"));
        startDate = setHours(startDate,23);
        startDate = setMinutes(startDate,59);
        startDate = setSeconds(startDate,59);
    
        if(sousouContract.current)
           sousouContract.current.methods.createSouSou(getValues("name"),getValues("numberOfHands"),getValues("amount"),getValues("distribution"),startDate.getTime()).send({from:user.get("ethAddress")})
        .on('receipt', function(receipt){

          setDialogMessage("New Sou Sou Created");
          setDialogSeverity("success");
          setMessageDialogOpen(true);
          setIsCreating(false);
          setNewSouSou(new Date());
          console.log(receipt);
         
          
         }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
            setDialogMessage("Error New Sou Sou Not Created "+error.message);
            setDialogSeverity("Error");
            setMessageDialogOpen(true);
            setIsCreating(false);

        });
    };

      const handleDialogClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setMessageDialogOpen(false);
      };  
    const handleCreateErrorClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setCreateError(false);
      };
    
    const handleSuccessClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setCreateSuccess(false);
      };

      const handleConfirmDialogClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        console.log(event.target);
        setConfirmMessageDialogOpen(false);

        if(event.target.innerHTML =="Yes")
        {
            /*alert((new Date(getValues("startDate"))).getTime());
            setDialogMessage("New Sou Sou Created");
            setDialogSeverity("success");
            setMessageDialogOpen(true);*/
            createSouSou();
        }
        else
        {
            setDialogMessage("New Sou Sou Not Created");
            setDialogSeverity("error");
            setMessageDialogOpen(true);
        }
    };
    
    
      const _handleSubmit = (data,e) => {

        setConfirmDialogMessage(`Would you like to create a new Sou Sou? `);
        setConfirmDialogSeverity("info");
        setConfirmMessageDialogOpen(true);  
      // alert(JSON.stringify(data))
       /* setUserData( {firstname:data.firstName,lastname:data.lastName,email:data.email}).then(function(results) {
            setCreateSuccessMessage("Your profile has been updated successfully!");
            setCreateSuccess(true);
           
          }).catch((error) => {
           // alert(JSON.stringify(error));
           setCreateErroMessage(" Error creating user! "+error.message);
             setCreateError(true);
          });
    */
       
      };
      const handleStartDateChange = (date) => {
        setStartDate(date);
        setValue('startDate', date, { shouldValidate: true, shouldDirty: true});
    
      };



    if(!isAuthenticated)
    history.push("/");
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
    
    <Grid item xs={6} sm={6}>
      <Paper className={classes.paper}><div className={classes.sousouHeader}>
      <span className={classes.headerText}>Sou Sou's Managed</span> <SupervisorAccountIcon className={classes.largeIcon}/></div>
     
      <Grid container spacing={2}>
     
   <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {noRows} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Number</span></div>
   </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
    <Paper className={classes.paperSouSou}>

      <div align="center"><span className={classes.headerMoney}><NumberFormat value= {handTotals} displayType={'text'} thousandSeparator={true} prefix={'$'} />
     </span></div>
      <div align="center"><span className={classes.headerText}>Total</span></div>
      </Paper>
    </Grid>
</Grid>   
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6}>
      <Paper className={classes.paperCreate}><div className={classes.sousouHeader}>
      <span className={classes.headerText}>Create New Sou Sou</span><CreateIcon className={classes.largeIcon} />
      </div>
        <div className={classes.formCreate}  >
        <form className={classes.form} noValidate onSubmit={handleSubmit(_handleSubmit)} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
            <Controller render={({field: {onChange,onBlur, value, name, ref },fieldState:{error}}) => (<TextField onChange={onChange} value={value} label="Name"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null}  
            />)} name="name"  control={control}  rules={{required: 'Name is required'}}  />
               

            </Grid>

            <Grid item xs={12} sm={6}>
            <Controller render={({field: {onChange,value},fieldState:{error}}) => (
                <TextField  select onChange={onChange} value={value} label="Frequency"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null} 
                >
                    <MenuItem value={1}>Weekly</MenuItem>
                 <MenuItem value={2}>Two Weeks - Fortnighly</MenuItem>
                 <MenuItem value={3}>Monthly</MenuItem> 
                </TextField>)} 
                name="distribution"  control={control}  
                rules={{required: 'Frequency is required'}} 
                />
            </Grid>
            
            <Grid item xs={12} sm={6}>
            <Controller render={({field: {onChange,value},fieldState:{error}}) => (
                <TextField type ="number" onChange={onChange} value={value} label="Number of Hands"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null} 
                />)} 
                name="numberOfHands"  control={control}  
                rules={{	
                   validate: value =>(((watch("distribution") == 1 && (value >= 3 && value <=52) ) ||   (watch("distribution") == 2 && (value >= 3 && value <=26) )
                ||   (watch("distribution") == 3 && (value >= 3 && value <=12) ))  ?  true :(watch("distribution") == 1 ? "Min 3 Max 52" : (watch("distribution") == 2 ? "Min 3 Max 26": "Min 3 Max 12") )),required: '# hands is required'}} 
                />
            </Grid>

            <Grid item xs={12} sm={6}>
            <Controller render={({field: {onChange,value},fieldState:{error}}) => (
                <TextField type ="number" onChange={onChange} value={value} label="Amount"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null} 
                />)} 
                name="amount"  control={control}  
                rules={{validate: value => 
                    value > 0  || "Amount greater than 0",required: 'Amount is required'}} 
                />
            </Grid>

            <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <Controller render={({field: {onChange,value},fieldState:{error}}) =>( 
             <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          onChange={handleStartDateChange}
          id="date-picker-inline"
          label="Start Date"
          autoOk="true"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          helperText={error ? error.message : null}
  className={classes.root2}/>)}
  name="startDate"  control={control}   rules = {{validate: value =>( (new Date(value) instanceof Date && !isNaN(new Date(value).valueOf()))  || "Invalid Date"),required:"Date is required"}} defaultValue={startDate}
/>    </MuiPickersUtilsProvider>

            </Grid>
            <Grid item xs={12}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled = {isCreating}
          >
           Create
          </Button>
                </Grid>
          </Grid>
        
          <Grid container justify="flex-end">
            <Grid item>
            
              <Snackbar open={createSuccess} autoHideDuration={6000} onClose={handleSuccessClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleSuccessClose} severity="success" elevation={6} variant="filled"> 
                 {createSuccessMessage}
                </MuiAlert>
               </Snackbar>

               <Snackbar open={createError} autoHideDuration={6000} onClose={handleCreateErrorClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleCreateErrorClose} severity="error" elevation={6} variant="filled">
                  {createErrorMessage}
                </MuiAlert>
               </Snackbar>
            </Grid>
          </Grid>
        </form>
         </div>   
      </Paper>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Paper className={classes.paper}><div className={classes.sousouHeader}>
      <span className={classes.headerText}>My Managed Sou Sou's</span> <MonetizationOnIcon className={classes.largeIcon}/></div>
      <Grid container spacing={2}>

      {_rows.map((row) => (
        <SouSou row={row}></SouSou>
      ))}

      </Grid>
      <TablePagination
      count={noRows}
      page={page}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      labelRowsPerPage="Items per page:"
    />
     </Paper>
    
    </Grid>
    </Grid>

    <Dialog
        open={confirmMessageDialogOpen}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Information"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {confirmDialogMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary" autoFocus  variant="contained">
            No
          </Button>
          <Button onClick={handleConfirmDialogClose} color="secondary"  variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={messageDialogOpen} autoHideDuration={80000} onClose={handleDialogClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert onClose={handleDialogClose} severity={dialogSeverity} elevation={6} variant="filled"> 
                {dialogMessage}
                </MuiAlert>
               </Snackbar>
   
    </div>
    )
}
