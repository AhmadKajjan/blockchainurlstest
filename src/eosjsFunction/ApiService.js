import {Api,JsonRpc,RpcError} from 'eosjs';
import {JsSignatureProvider} from 'eosjs/dist/eosjs-jssig';


// async function takeAction (apiurl,action,contractaccount,actor,privatekey,datavalue)
// {
//     console.log(privatekey);
//     const PrivateKey=privatekey;
//     const rpc=new JsonRpc(apiurl,{fetch});
//     const signatureProvider=new JsSignatureProvider([PrivateKey]);
//     const api=new Api({rpc,signatureProvider,textDecoder :new TextDecoder(),textEncoder:new TextEncoder()});
//     try{
//         const resultWithConfig = await api.transact({
//            actions:[{ 
//                 account:contractaccount,
//                 name:action,
//                 authorization: [{
//                     actor:actor,
//                      permission:'active',
//                     }],
//                     data:datavalue,
//             }]},
//             {
//                 blocksBehind:3,
//                 expireSeconds:30,
//             });
//             return resultWithConfig;
//     }
//     catch(e){
//        return e;
//     }
// }

// async function getAccountCurrency(api,contractaccount,accountName,symbol)
//     {
//         const rpc=new JsonRpc(api,{fetch});
//         try{
//             const res=rpc.get_currency_balance(contractaccount,accountName,symbol);
//             return res;
//         }
//         catch(e){
//             return e;
//         }
//     }

async function getTablesInfo()
{
    const rpc=new JsonRpc('https://eos.greymass.com',{fetch});
        try{
            const res=rpc.get_table_rows({
                                        json:true,
                                        code:'eosio',
                                        scope:'eosio',
                                        table:'producers',
                                        limit:1000,
                                        reverse:false,
                                        show_payer:false});
            return res;

        }
        catch(e){
            return e;
        }
}

class ApiService{
 
   static get(){
       return getTablesInfo();
   }
} 

export default ApiService;