import React, {useState,useEffect}  from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import { useMoralis } from "react-moralis";
import Button from '@material-ui/core/Button';
import {  makeStyles} from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppNav() {
    const [anchorEl, setAnchorEl] = useState(null);
    const {  user,logout,isAuthenticated,isInitialized} = useMoralis();
    const [profilePicUrl,setProfilePicUrl] = useState("");
    const classes = useStyles();
    const history = useHistory();
    useEffect(() => {
      if(user)
        setProfilePicUrl(user.get("ipfs"));
    },[user]);
    const _handleDisconnect = (event) => {
      setAnchorEl(event.currentTarget);
  
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const logoutMenu = () => {
        setAnchorEl(null);
        logout();
       // history.push("/");
  
      };
  const profileMenu = () => {
    setAnchorEl(null);
    history.push("/profile");
  }
  const manageMenu = () => {
    history.push("/manage");
  }
          
    return (
        <React.Fragment>
             <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Sou Sou - Peer to Peer Lending Platform
          </Typography>
         
         

          { (isAuthenticated && <Button color="inherit" onClick={manageMenu}>Manage</Button> ) }
          { (isAuthenticated &&   <Button color="inherit">Memberships</Button> )}
            <Button color="inherit">About</Button>
          { (isAuthenticated && <Button onClick={_handleDisconnect} aria-haspopup="true"><Avatar src={profilePicUrl}/></Button>)}

          <Menu
    id="simple-menu"
    anchorEl={anchorEl}
    keepMounted
    open={Boolean(anchorEl)}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
  >
    <MenuItem onClick={profileMenu }>My Profile</MenuItem>
    <MenuItem onClick={logoutMenu}>Logout</MenuItem>
  </Menu>

        </Toolbar>
      </AppBar> 
     
        </React.Fragment>
    )
}
