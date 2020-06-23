const INITIAL_STATE={
    producer_Table:[],
    producerHaveChains:[],
    producerHaveBP:[],
}

const urlReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type)
    {
        case 'Set_Producer_Table':
            return{
                ...state,
                producer_Table:action.payload
            }
         case 'Set_ProducerHaveChains':
                return{
                    ...state,
                    producerHaveChains:action.payload
                }
        case 'Set_ProducerHaveBP':
                return{
                    ...state,
                    producerHaveBP:action.payload
                }               
        default:
            return state;
    }
}
export default urlReducer; 