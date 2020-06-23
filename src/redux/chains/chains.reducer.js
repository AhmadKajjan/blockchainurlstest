const INITIAL_STATE={
    eos_mainnet:[],
    wax_mainnet:[],
    telos_mainnet:[],
    proton_mainnet:[],
}

const chainsReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case 'Set_Eos_MainNet':
            return{
                ...state,
                eos_mainnet:action.payload
            }
         case 'Set_Wax_MainNet':
                return{
                    ...state,
                    wax_mainnet:action.payload
                }
        case 'Set_Telos_MainNet':
                return{
                    ...state,
                    telos_mainnet:action.payload
                }     
        case 'Set_proton_MainNet':
                return{
                    ...state,
                    proton_mainnet:action.payload
                }             
        default:
            return state;
    }
}
export default chainsReducer; 