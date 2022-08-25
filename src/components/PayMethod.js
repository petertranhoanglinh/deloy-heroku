import React, { useState, useEffect } from 'react';
import Util from './Util';
   
function PayMethod(props){  
    const [state, setValue] = useState({balances:[]});
    const [coin, setCoin] = useState("");
    useEffect(() => {
            const getBalance = async() =>{
                fetch(Util.URL_REST + "api/account/balance/*/"+1, {
                    method: "GET",
                    headers: Util.headersList,
                  })
                    .then((res) => res.json())
                    .then((json) => {
                       setValue({
                          balances:json
                         
                       })
                       console.log(json);
                    });
            }
             getBalance();
      }, []);
    switch (props.name) {
        
        case 'COIN':
            return (
            <div>
                <h1>{props.name}</h1>
               <select name="coinId"  class="form-control"    onChange={(e) => setCoin(e.target.value)}>
               <option value="">Choose coin to payment</option>
                {
                    state.balances.map(
                        balance =>
                            <option value={balance.coinId}>{balance.coinId} Have you quantity {balance.quantityReal} Total price: {balance.value}$</option>
                    )
                }
               </select>
               
            </div>)
        default:
            return null;
         
    }
   
        
       
    
    
  
    
   
}
export default PayMethod;