import  React from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Alert from '@material-ui/lab/Alert';

class ShowAllData extends React.Component{
    
    constructor(props)
    {
        super(props);
        this.state={
            chainState:[],
        
            }
      }
    testfunc=async(nodes)=>{
        var urlData=[];
        for await(const child of nodes)
        {
           
        //3dd8454a89aa4b95b5727b5429b2f6e9//http://api.ipstack.com/134.201.250.155? access_key = YOUR_ACCESS_KEY
          for await( const  elem of  Object.entries(child))
            {
                if((Object.values(elem)[0]==='api_endpoint'||Object.values(elem)[0]==='ssl_endpoint'||Object.values(elem)[0]==='p2p_endpoint')&&Object.values(elem)[1]!=="")
                    {
                        
                        var apiUrl=Object.values(elem)[1];
                        apiUrl=apiUrl.replace('https://','');
                        apiUrl=apiUrl.replace('http://','');
                        if(Object.values(elem)[0]==='p2p_endpoint'){
                            const index=apiUrl.indexOf(':');
                            apiUrl=apiUrl.substr(0,index);
                        
                        }
                        const searchUrl='http://api.ipstack.com/'+apiUrl+'?access_key=3dd8454a89aa4b95b5727b5429b2f6e9';
                        console.log(searchUrl);
                        const y=await fetch(searchUrl);
                        const z=await y.json();
                        console.log(z);
                        urlData=[...urlData,{
                        locationOnChainCountryCode:child.location.country,
                        locationIpStackCountryCode:z.country_code,
                            node_type:child.node_type,
                        }];
                        
                
                }
            }
        }
        console.log(urlData);
        return(urlData);

    }
     componentDidMount=async()=>{
        var chainArray;
        if(this.props.chaintype==="eos")
            chainArray=this.props.eos_mainnet;
        else if(this.props.chaintype==="wax")
            chainArray=this.props.wax_mainnet;
        else if(this.props.chaintype==="telos")
            chainArray=this.props.telos_mainnet;
        else if(this.props.chaintype==="proton")
            chainArray=this.props.proton_mainnet;
        var tostate=[];
        console.log(chainArray);
        for await(const url of chainArray){
            try{
            const x= await fetch(url);
            const p1=await x.json();      
            try{
                
                const urlData=await this.testfunc(p1.nodes);
                console.log(urlData);
                tostate=[...tostate,{url:url,res:urlData}];

            } 
                catch(err)
                {
                            console.log(err);
                }
              
            }   
            catch(err){
                console.log(err);
            }
            
        }
     
             this.setState({...this.state,chainState:tostate});    
        
    }

 render(){
    return  (
                this.state.chainState.length===0?
                 <div>
                    <CircularProgress />
                    <h4>please wait until the compering  data is done </h4>
                </div>:
                <div>{
                 <Grid container spacing={3}>{
                    this.state.chainState.map(elem=>{
                        return <Grid item xs={4}>
                                     <Paper elevation={3}>
                                        <ExpansionPanel>
                                            <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={elem.url}
                                            id={elem.url}
                                            >
                                            <Typography>{elem.url}</Typography>
                                            </ExpansionPanelSummary>
                                                    {
                                                        elem.res.map(ans=>{
                                                            return <div>
                                                 <ExpansionPanelDetails>
                                                                    <h5>{ans.node_type}</h5>
                                                                    {
                                                                        ans.locationOnChainCountryCode===ans.locationIpStackCountryCode?
                                                                        <Alert severity="success">producer honest in this</Alert>
                                                                    :
                                                                        <Alert severity="error">producer lied in this</Alert>
                                                                    }

                                                </ExpansionPanelDetails>
                                                                </div>
                                                         })
                                                    }
                                        </ExpansionPanel>     
                                    </Paper>   
                             </Grid>
                    })
            }
               </Grid>
                }
                </div>
        )
 }

}
const mapStateToProps=state=>({
    eos_mainnet:state.chains.eos_mainnet,
    wax_mainnet:state.chains.wax_mainnet,
    telos_mainnet:state.chains.telos_mainnet,
    proton_mainnet:state.chains.proton_mainnet,
})

export default connect(mapStateToProps,null)(ShowAllData);