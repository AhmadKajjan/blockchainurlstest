import React from 'react';
import ApiService from '../../eosjsFunction/ApiService';
import {connect} from 'react-redux';
import ChainsId_Data from '../../eosjsFunction/ChainsID_Data';
import {setProducer_Tabel,setProducerHaveChains,setProducerHaveBP} from '../../redux/url/url.actions';
import {setEosMainNet,setTelosMainNet,setProtonMainNet,setWaxMainNet} from '../../redux/chains/chains.action';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress'; 
async function fetchData(urls){
    
    var chainsArray = [];
    var bpArray = [];
    var x=[{key:'',value:''}];
    for (let i = 0; i < urls.length; i++)   {
     let res;
     var savedurl;
     var url=urls[i].url; 
        if(url===null)
            continue;
        if(url.charAt(url.length-1)==='/'){
            url = url.substring(0, url.length - 1);
        }
        savedurl=url;
         url+="/chains.json";
      try {
        let p1 = await fetch(url);
        console.log(p1);
        let p2 = await p1.json();
        res=p2;
        if(res!==undefined&&res!==null)
        {
            Object.entries(res.chains).forEach(item=>{
                var chainIDOfItem=Object.values(item)[0];
                var jsonPath=Object.values(item)[1];
                if(jsonPath.charAt(0)!=='/')
                    jsonPath='/'+jsonPath; 
                var used=false;
                chainsArray.forEach(elem=>{
                        console.log(elem);
                    if(Object.values(item)[0].includes(elem.type)){
                      if(!elem.value.includes(savedurl+jsonPath))
                        elem.value.push(savedurl+jsonPath);
                        used=true;
                    }
                })
                if(used===false)
                {
                    var l;
                  
                    if(chainIDOfItem.includes(ChainsId_Data.ChainsId_Data.eos)){
                        l={
                                type:ChainsId_Data.ChainsId_Data.eos,
                            value:[savedurl+jsonPath,]
                        }
                    }
                    else if(chainIDOfItem.includes(ChainsId_Data.ChainsId_Data.wax)){
                        l={
                                type:ChainsId_Data.ChainsId_Data.wax,
                            value:[savedurl+jsonPath,]
                        }
                    }
                    else if(chainIDOfItem.includes(ChainsId_Data.ChainsId_Data.telos)){
                        l={
                                type:ChainsId_Data.ChainsId_Data.telos,
                            value:[savedurl+jsonPath,]
                        }
                    }
                   else  if(chainIDOfItem.includes(ChainsId_Data.ChainsId_Data.proton)){
                        l={
                                type:ChainsId_Data.ChainsId_Data.proton,
                            value:[savedurl+jsonPath,]
                        }
                    }
                    else{
                        l={
                            type:'otherStuff',
                        value:[savedurl+jsonPath,]
                    }
                    }
                    chainsArray.push(l);
                }
            })
        }
   
      }
      catch (e) {
        console.error(e.message);
      }
     url=urls[i].url; 
      if(url===null)
          continue;
          if(url.charAt(url.length-1)==='/')
             url = url.substring(0, url.length - 1);
          url+="/bp.json";
      try {
        let p1 = await fetch(url);
        let p2 = await p1.json();
        res=p2;
        if(res!==undefined&&res!==null)
        {
            chainsArray.forEach(elem=>{
                if(elem.type===ChainsId_Data.ChainsId_Data.eos)
                    if(!elem.value.includes(url))
                        elem.value.push(url);     
            })
        }
      }
      catch (e) {
        console.error(e.message);
      }
    };
    chainsArray.sort(function (a,b) {
        return b.total_votes-a.total_votes;
    })
    return ({
        chains:chainsArray,
    })
  };
  
async function  getDataResult(producerTable) {
    const x=await fetchData(producerTable);
    console.log(x);
   return x;
}
class TestPage extends React.Component
{

    componentDidMount=async()=>
    {
        await ApiService.get().then(res=>{this.props.setProducerTabel(res.rows);});
        if(this.props.producerTable.length>0)
            this.getListOFChainsProducers()
    }
  
    getListOFChainsProducers=()=>{
        console.log('test');
        getDataResult(this.props.producerTable).then(res=>{
            res.chains.forEach(elem=>{
                if(elem.type===ChainsId_Data.ChainsId_Data.eos)
                    this.props.setEosMainNet(elem.value);
                else if(elem.type===ChainsId_Data.ChainsId_Data.wax)
                    this.props.setWaxMainNet(elem.value);
                else if(elem.type===ChainsId_Data.ChainsId_Data.telos)
                    this.props.setTelosMainNet(elem.value);
                else if(elem.type===ChainsId_Data.ChainsId_Data.proton)
                    this.props.setProtonMainNet(elem.value);
            })
            this.props.setProducerHaveChains(res.chains);
        });
        
    }
    render()
    {
        return(
                 <div>
                  
                    <div>
                        chains:
                    </div>
                    <div>
                    {
                        
                        this.props.producerHaveChains.length>0?
                             <Alert severity="success">Done</Alert>
                             :
                             <div>
                                 <CircularProgress />
                                <h4>please wait until the fetching data is done you can use or programs after you see success alert is done</h4>
                            </div>
                    }
                    </div>
                </div>
         )
    }
}
const mapDispatchToProps=dispatch=>({
    setProducerTabel:producer_table=>dispatch(setProducer_Tabel(producer_table)),
    setProducerHaveChains:producerhavechain=>dispatch(setProducerHaveChains(producerhavechain)),
    setProducerHaveBP:producerhavebp=>dispatch(setProducerHaveBP(producerhavebp)),
    setEosMainNet:eos=>dispatch(setEosMainNet(eos)),
    setWaxMainNet:wax=>dispatch(setWaxMainNet(wax)),
    setTelosMainNet:telos=>dispatch(setTelosMainNet(telos)),
    setProtonMainNet:proton=>dispatch(setProtonMainNet(proton)),
})
const mapStateToProps=state=>({
    producerTable:state.url.producer_Table,
    producerHaveChains:state.url.producerHaveChains,
}) 
export default connect(mapStateToProps,mapDispatchToProps)(TestPage);