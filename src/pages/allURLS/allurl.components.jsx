import React from 'react';
import {connect} from 'react-redux';

const Allurl=({producerHaveChains})=> (

        <div>
            {
                producerHaveChains.length!==0 ?
                
                <div>{
                    producerHaveChains.map(item=>{
                      return  <div>
                            <h3>{item.type}</h3>
                            <div>{
                            item.value.map(elem=>{
                               return <div> 
                                    <h6>{elem}</h6>        
                                </div>
                            })}
                            </div>

                        </div>
                    })
                }
                </div>:
                <div>
                     null
                </div>
            }
        </div>
    
) 
const mapStateToProps=state=>({
    producerHaveChains:state.url.producerHaveChains,
}) 
export default connect(mapStateToProps,null)(Allurl);