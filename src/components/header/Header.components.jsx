
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {connect }from 'react-redux';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link:{
      textDecoration:'none',
      margin:'10px 5px',
      color:'white',
  }
}));

 const Header=({producerHaveChains})=> {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Eos-Arabia
          </Typography>
          {
            producerHaveChains.length>0?
            <div>
              <Link to="/eos_mainnet" className={classes.link}>EOS</Link>
              <Link to="/wax_mainnet" className={classes.link}>WAX</Link>
              <Link to="/telos_mainnet" className={classes.link}>TELOS</Link>
              <Link to="/proton_mainnet" className={classes.link}>PROTON</Link>
            </div>  
            :
            null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps=state=>({
  producerHaveChains:state.url.producerHaveChains
})
export default connect(mapStateToProps,null)(Header);