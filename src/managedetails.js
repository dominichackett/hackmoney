import { useMoralis } from "react-moralis";
import { useHistory,useLocation,useParams } from "react-router-dom";
import React, { useState,useEffect,useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {useForm ,Controller } from "react-hook-form";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { SOUSOU_ADDRESS, SOUSOU_ABI } from "./contracts";
import { format} from 'date-fns';
import TablePagination from '@material-ui/core/TablePagination';
import EventNoteIcon from '@material-ui/icons/EventNote';
import EmailIcon from '@material-ui/icons/Email';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: "black",
    },
  });

const useStyles = makeStyles((theme) => ({
   
    largeIcon: {
      width: 50,
      height: 50,
    },
    dialogIcon: {
        width: 50,
        height: 50,
      },
    sousouIcon:{
    width: 50,
    height: 50,
    color : "rgb(145, 144, 143)"
},
  button:{
      width:"100%",
      marginTop:"5px"
  }  
,
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

    paperDialog:
    {
       display:"flex",
        padding: "15px",
        textAlign: 'left',
        backgroundColor: "rgba(52, 67, 249, 0.15)",
        "border-radius": "10px",
       border: "1px solid rgb(0, 220, 45)",
    },
    sousouHeader: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        
        paddingBottom: "5px"
  
      },
      headerMainText: {
        "fontSize": "20px",
      "fontWeight": "500",
      color: "rgb(134, 190, 255);",
      "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      "WebkitFontSmoothing": "antialiased",
      "lineHeight": "1.5",
     
      },
    headerText: {
      "fontSize": "15px",
    "fontWeight": "500",
    color: "rgb(134, 190, 255);",
    "fontFamily": "'Gordita', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    "WebkitFontSmoothing": "antialiased",
    "lineHeight": "1.5",
   
    },
    headerNumber: {
        "fontSize": "15px",
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
        "fontSize": "15px",
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
     },
     dialogPaper: {
        minHeight: '37em',
        maxHeight: '37em',
    },
    "modal_header": {
        "background": "linear-gradient(\n330deg\n, rgba(255, 143, 5, 1) 0%, rgba(255, 201, 5, 1) 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ff8f05\", endColorstr=\"#ffc905\", GradientType=1)",
        "color": "#111",
        "border": "0",
        "display": "flex",
      
        "justify-content": "space-between",
        "padding": "1rem 1rem",
        "borderBottom": "1px solid #dee2e6",
        "borderTopLeftRadius": "calc(.3rem - 1px)",
        "borderTopRightRadius": "calc(.3rem - 1px)"
      },
      dialog: {
        height:600,color:"#18b3e2"

      },
      dialogText:{
        color:"#18b3e2",
        width:"100%",
        height:"100%"
      },
      dialogHeader: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        
        paddingBottom: "5px",
        "background": "linear-gradient(\n330deg\n, rgba(255, 143, 5, 1) 0%, rgba(255, 201, 5, 1) 100%)",
        "filter": "progid:DXImageTransform.Microsoft.gradient(startColorstr=\"#ff8f05\", endColorstr=\"#ffc905\", GradientType=1)",
        "color": "#111",
        "border": "0",
        "display": "flex",
      
        "justify-content": "space-between",
        "padding": "1rem 1rem",
        "borderBottom": "1px solid #dee2e6",
        "borderTopLeftRadius": "calc(.3rem - 1px)",
        "borderTopRightRadius": "calc(.3rem - 1px)"
      },

    
      dialogItem: {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        
        padding: "2px"
  
      },
      dialog_second_row:
      {
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        
        padding: "5px",
      },
      dialog_main_div:
      {
          padding:"15px",
          backgroundColor: "rgba(52, 67, 249, 0.15)",
          "border-radius": "10px",
         border: "1px solid rgb(0, 220, 45)",
         marginTop:"8px"
     }
  }));
  
  function SouSou(props) {
    const classes = useStyles();
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
            color="primary">View</Button><EventNoteIcon className={classes.sousouIcon} /></div>
             </Paper>   
           </Grid>
  </React.Fragment>);
  }
export default function ManageDetails() {
    const { isInitialized,user,setUserData, isAuthenticated,Moralis} = useMoralis();
    const history = useHistory();
    const classes = useStyles();
    const [createErrorMessage,setCreateErroMessage] = useState("");
    const [createError, setCreateError] = useState(false);
    const [createSuccess, setCreateSuccess] = useState(false);
    const [handTotals,setHandTotals] = useState(0);
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
    const[isSendingInvite,setIsSendingInvite] = useState(true);
    const [newSouSou,setNewSouSou] = useState(new Date());
    const [sousouName,setSouSouName] = useState();
    const [sousouStartDate,setSouSouStartDate] = useState(null);
    const [sousouCreatedDate,setSouSouCreatedDate] = useState(null);

    const [sousouFrequency,setSouSouFrequency] = useState();
    const [sousouHands,setSouSouHands] = useState();
    const [sousouAmount,setSouSouAmount] = useState();
    const [sousouHandTotal,setSouSouHandTotal] = useState();
    const [sousouInvites,setSouSouInvites] = useState();
    const [sousouAcceptedInvites,setSouSouAcceptedInvites] = useState();
    const [sousouDeclinedInvites,setSouSouDeclinedInvites] = useState();
    const [createdInvite,setCreatedInvite] = useState(new Date());
    const {id} = useParams();
    const location = useLocation();
    const [inviteDialogText,setInviteDialogText] = useState("");
    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const [inviteDetails, setInviteDetails] = useState([]);
    const [acceptedInviteDetails, setAcceptedInviteDetails] = useState([]);
    const [declinedInviteDetails, setDeclinedInviteDetails] = useState([]);

    const [dialogRow,setDialogRow] = useState([]);

    const querySouSouDetails =  new Moralis.Query("CreatedSouSou");
    useEffect(() => {
        if(Number.isInteger(parseInt(id)))
        {
           if(user && isInitialized)
           { 
                 //Get Invites
            const params =  {sousou:id,userAddress:user.get("ethAddress").toLowerCase() };
     
            Moralis.Cloud.run("getSouSouInvites", params).then(function(results){
               // if(results.length > 0)
                 var idetails = [];
                 results.forEach(function(result){
                   idetails.push(result);
                   console.log(result); 
                });

                    setInviteDetails(results)
               // console.log(results)
               
             }).catch(function(error){
      
             });

            Moralis.Cloud.run("getSouSouAcceptedInvites", params).then(function(results){
                // if(results.length > 0)
                  var idetails = [];
                  results.forEach(function(result){
                    idetails.push(result);
                    console.log(result); 
                 });
 
                     setAcceptedInviteDetails(results)
                // console.log(results)
                
              }).catch(function(error){
       
              });


            Moralis.Cloud.run("getSouSouDeclinedInvites", params).then(function(results){
                // if(results.length > 0)
                  var idetails = [];
                  results.forEach(function(result){
                    idetails.push(result);
                    console.log(result); 
                 });
 
                     setDeclinedInviteDetails(results)
                // console.log(results)
                
              }).catch(function(error){
       
              });
  

           }
        }
    },[id,isInitialized,user,createdInvite]);

    useEffect(() => {
        if(Number.isInteger(parseInt(id)))
        {
           if(user && isInitialized)
           { 
            
            const params =  {sousou:id,userAddress:user.get("ethAddress").toLowerCase() };
           
            //Get Invites
            Moralis.Cloud.run("getSouSouInvitesCount", params).then(function(results){
               if(results.length > 0)
                setSouSouInvites(parseInt(results[0].count));  
               else
               setSouSouInvites(0);
            }).catch(function(error){
     
            });

             //Get Accepted Invites
             Moralis.Cloud.run("getSouSouAcceptedInvitesCount", params).then(function(results){
                if(results.length > 0)
                 setSouSouAcceptedInvites(parseInt(results[0].count));  
                else
                setSouSouAcceptedInvites(0);
             }).catch(function(error){
      
             });


              //Get Declined Invites
            Moralis.Cloud.run("getSouSouDeclinedInvitesCount", params).then(function(results){
                if(results.length > 0)
                 setSouSouDeclinedInvites(parseInt(results[0].count));  
                else
                setSouSouDeclinedInvites(0);
             }).catch(function(error){
      
             });
            
               Moralis.Cloud.run("getSouSouDetails", params).then(function(results){
               if(results.length > 0)
               {
                   var freq = ["","Weekly","Fortnightly","Monthly"];
                   setSouSouStartDate(parseInt(results[0].startDate));
                   setSouSouFrequency(freq[results[0].distribution]);
                   setSouSouHands(results[0].numberOfHands);
                   setSouSouAmount(results[0].amount);
                   setSouSouHandTotal(results[0].total);
                   setSouSouCreatedDate(parseInt(results[0].createdDate)*1000);
                   setSouSouName(results[0].name);
                   setIsSendingInvite(false);

               }
               else
               {
                  setDialogMessage("Error Sou Sou Not Found");
                  setDialogSeverity("Error");
                  setMessageDialogOpen(true);
                  setIsSendingInvite(true);
               }
               
                }).catch(function(error){
     
               });

           }    
        }
        else
        {
            setDialogMessage("Error New Sou Sou Not Found");
                  setDialogSeverity("Error");
                  setMessageDialogOpen(true);
                  setIsSendingInvite(true);
        }
        
    },[user,isInitialized,createdInvite]);

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

    const {getValues,watch,control,handleSubmit,formState: { errors }} = useForm({defaultValues:{
        name: "",
       email:"",
       confirmEmail:""
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


    const sendSouSouInvite = () => {



        setDialogMessage("Sending invitation to user. Please Confirm");
        setDialogSeverity("info");
        setMessageDialogOpen(true);
        setIsSendingInvite(true);
        const MyInvites = Moralis.Object.extend("MyInvites");
        const  myInvite = new MyInvites();
        
       if(user)
       {
        myInvite.save({
         owner:user.get("ethAddress"),
         sousou:id,
         email:getValues("email"),
         name:getValues("name"),
        }).then((invite)=> {
            if(sousouContract.current)
            sousouContract.current.methods.addInvite(invite.get("sousou"),invite.id).send({from:user.get("ethAddress")})
         .on('receipt', function(receipt){
 
           setDialogMessage("Invitation has been sent");
           setDialogSeverity("success");
           setMessageDialogOpen(true);
           setIsSendingInvite(false);
           setCreatedInvite(new Date());
             //Send Email 
             const params =  {userAddress:user.get("ethAddress").toLowerCase()
                               ,email:invite.get("email")
                               ,senderName:user.get("firstname")+ " "+user.get("lastname")
                               ,recipientName: invite.get("name") 
                               ,buttonUrl:  location.pathname                        
                             };

             Moralis.Cloud.run("getSouSouInvitesCount", params).then(function(results){
                if(results.length > 0)
                 setSouSouInvites(parseInt(results[0].count));  
                else
                setSouSouInvites(0);
             }).catch(function(error){
      
             });
           console.log(receipt);
          
           
          }).on('error', function(error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
             setDialogMessage("Error unable to send invite"+error.message);
             setDialogSeverity("Error");
             setMessageDialogOpen(true);
             setIsSendingInvite(false);
             invite.destroy().then((myObject) => {
                // The object was deleted from the Moralis Cloud.
                setCreatedInvite(new Date());

              }, (error) => {
                // The delete failed.
                // error is a Moralis.Error with an error code and message.
              }); //delete the invite
             
         });
        }, (error) => {
  
            setDialogMessage("Error Sending Invite. "+error.message);
            setDialogSeverity("error");
            setMessageDialogOpen(true);
            setIsSendingInvite(false);

       });

       }
        
    
       
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
            sendSouSouInvite();
        }
        else
        {
            setDialogMessage("Invite Not Sent");
            setDialogSeverity("error");
            setMessageDialogOpen(true);
        }
    };
    
    
      const _handleSubmit = (data,e) => {

        setConfirmDialogMessage(`Would you like to send this invite? `);
        setConfirmDialogSeverity("info");
        setConfirmMessageDialogOpen(true);  
      
       
        alert(JSON.stringify(data))
        return;
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
    
  const handleClose = () => {
    setOpen(false);
  };  


  const handleClickOpen = (scrollType,dialogType) => () => {
    setOpen(true);
    setScroll(scrollType);
    if(dialogType == 1)
    {
       setInviteDialogText("Invites");
       setDialogRow(inviteDetails);

    }
    

    if(dialogType == 2)
    {
        setInviteDialogText("Accepted Invites");
        setDialogRow(acceptedInviteDetails);

    }

    
    if(dialogType == 3)
    {
        setInviteDialogText("Declined Invites");
        setDialogRow(declinedInviteDetails);
    }
  };

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  const Row = ({ index, style }) => {

    return(<div className={classes.dialog_main_div} >
        
          
               <div className={classes.dialogItem}  id={dialogRow[index].guid}>
               <span >{dialogRow[index].name}</span>
               <span> {(dialogRow[index].dateAdded != null? format(new Date(dialogRow[index].dateAdded *1000 ),"iii do MMM yyyy p") : "")}
</span>              </div>

<div >{dialogRow[index].email}</div>      
     </div> 
   )};

  const InviteList = () =>
  {
     
      return(
        <div style={{
          maxHeight: "27em",
          minHeight: "24em",
          width: "35em",
          
        }}>


        <AutoSizer  >
        {({height, width}) =>  {
                console.log(height, width);
              
         return <List
          height={height}
          width={width}
          itemSize={50}

          itemCount={dialogRow.length}
        >{Row}</List>
  }}
      </AutoSizer>
      </div>
      
      ) 
  }

 const InviteDialog = (props) =>
  {
    const {   ...other } = props;
    return(
      <Dialog classes={{ paper: classes.dialogPaper }}
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      className={classes.dialog}
      PaperProps={{
        style: {
          background:"linear-gradient(\n34deg\n, rgba(23, 60, 135, 1) 0%, rgba(14, 32, 87, 1) 48%, rgba(19, 28, 78, 1) 100%)",
          boxShadow: 'none',width:600
        }}}
    >
     <div className={classes.dialogHeader}  > 
     <DialogTitle id="scroll-dialog-title" onClose={handleClose}>{inviteDialogText}</DialogTitle>
</div>
      <DialogContent dividers={scroll === '1paper'}>

        <DialogContentText className={classes.dialogText}
          id="alert-dialog-description"
          
          tabIndex={-1}
        >

          <InviteList />
          
        </DialogContentText>
      </DialogContent>
     
    </Dialog>
  
    )
  }

     
    if(!isAuthenticated)
    history.push("/");
    return (
        <div className={classes.root}>
        <Grid container spacing={3}>
    
    <Grid item xs={6} sm={6}>
      <Paper className={classes.paper}><div className={classes.sousouHeader}>
      <span className={classes.headerMainText}>Sou Sou Details</span> <EventNoteIcon className={classes.largeIcon}/></div>
     
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>  
      <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}>{sousouName}</span></div>
      <div align="center"><span className={classes.headerText}>Name</span></div>
   </Paper>
   </Grid>
   <Grid item xs={12} sm={12}>  
      <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}>{(sousouStartDate != null? format(new Date(sousouStartDate),"iii do MMM yyyy p") : "")}</span></div>
      <div align="center"><span className={classes.headerText}>Start Date</span></div>
   </Paper>
  </Grid>
  <Grid item xs={12} sm={12}>  
      <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}>{(sousouCreatedDate !=null ? format(new Date(sousouCreatedDate),"iii do MMM yyyy p") : "")}</span></div>
      <div align="center"><span className={classes.headerText}>Created Date</span></div>
   </Paper>
  </Grid>
      <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}>{sousouFrequency}</span></div>
      <div align="center"><span className={classes.headerText}>Frequency</span></div>
   </Paper>
    </Grid>

    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouHands} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Hands</span></div>
   </Paper>
    </Grid>

   <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerMoney}><NumberFormat value= {sousouAmount} displayType={'text'} thousandSeparator={true} prefix={'$'}/></span></div>
      <div align="center"><span className={classes.headerText}>Amount</span></div>
   </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>
    <Paper className={classes.paperSouSou}>

      <div align="center"><span className={classes.headerMoney}><NumberFormat value= {sousouHandTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />
     </span></div>
      <div align="center"><span className={classes.headerText}>Hand Total</span></div>
      </Paper>
    </Grid>

    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Invites</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',1)}
            color="primary" >View</Button></div>
   </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouAcceptedInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Accepted Invites</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',2)}
            color="primary" >View</Button></div>
   </Paper>
    </Grid>

    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouDeclinedInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Declined Invites</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',3)}
            color="primary" >View</Button></div>
   </Paper>
    </Grid>

</Grid>   
      </Paper>
    </Grid>
    <Grid item xs={6} sm={6}>
      <Paper className={classes.paperCreate}><div className={classes.sousouHeader}>
      <span className={classes.headerMainText}>Send Invites</span><EmailIcon className={classes.largeIcon} />
      </div>
        <div className={classes.formCreate}  >
        <form className={classes.form} noValidate onSubmit={handleSubmit(_handleSubmit)} >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
            <Controller render={({field: {onChange,onBlur, value, name, ref },fieldState:{error}}) => (<TextField onChange={onChange} value={value} label="Name"  fullWidth variant="outlined"  error={!!error}    helperText={error ? error.message : null}  
            />)} name="name"  control={control}  rules={{required: 'Name is required'}}  />
               

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
            disabled = {isSendingInvite}

          >
           Send Invite
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
          
         <Grid container spacing={2}>
         <Grid item xs={12} sm={12}>

<div className={classes.sousouHeader}>
<span className={classes.headerMainText}>Manage</span> <SupervisorAccountIcon className={classes.largeIcon}/></div>
</Grid>
<Grid item xs={12} sm={12} md={12}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouDeclinedInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Payout Order Selected</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',3)}
            color="secondary" >Randomize Payout</Button></div>
   </Paper>
    </Grid>
<Grid item xs={12} sm={6}>  
      <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}>1</span></div>
      <div align="center"><span className={classes.headerText}>Current Hand</span></div>
   </Paper>
   </Grid>
   <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerMoney}><NumberFormat value= {sousouAmount} displayType={'text'} thousandSeparator={true} prefix={'$'}/></span></div>
      <div align="center"><span className={classes.headerText}>Current Payments</span></div>
   </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouDeclinedInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Contribution Paid</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',3)}
            color="secondary" >Pay</Button></div>
   </Paper>
    </Grid>
    <Grid item xs={12} sm={12} md={6}>   
   <Paper className={classes.paperSouSou}>
      <div align="center"><span className={classes.headerNumber}><NumberFormat value= {sousouDeclinedInvites} displayType={'text'} thousandSeparator={true} /></span></div>
      <div align="center"><span className={classes.headerText}>Hand Paid</span></div>
      <div><Button  variant="contained" className={classes.button} onClick={handleClickOpen('paper',3)}
            color="secondary" >Pay</Button></div>
   </Paper>
    </Grid>
</Grid>
      </Paper>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Paper className={classes.paper}><div className={classes.sousouHeader}>
      <span className={classes.headerMainText}>My Managed Sou Sou's</span> <MonetizationOnIcon className={classes.largeIcon}/></div>
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
   <InviteDialog />
    </div>
    )
}
