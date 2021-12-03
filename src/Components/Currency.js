import React,{useEffect, useState} from 'react'
import { getAllInfoByISO } from 'iso-country-currency';
import "./Currency.css"
function Currency({location}) {
    const [currencyCode,setCurrencyCode]=useState("")
    const [rate,setRate]=useState(null)
    const getRate=()=>{
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyCode.toLowerCase()}.json`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setRate(
                {
                    "USD":data.inr.usd,
                    "EUR":data.inr.eur
                }
            )
        });
    }
    useEffect(()=>{
        if(currencyCode)
            getRate()
    },[currencyCode])
    useEffect(()=>{
        setCurrencyCode(getAllInfoByISO(location.country).currency)
    },[]);
     if(rate)
     {
         console.log(rate)
         return(
             <div className="currency">
                  {/* <div className="currency_row">
                 <p>Currency</p> <p>Rate</p>
                 </div>
                 <div className="currency_row">
                 <p>USD:</p> <p>{rate.USD}</p>
                 </div>
                 <div className="currency_row">
                 <p>EUR:</p> <p>{rate.EUR}</p>
                 </div> */}
                 <header>
                        Currency Exchange
                    </header>
                <table className="currency_table">
                    
                    <tr>
                    <th>Currency</th>
                        <th>Rate</th>
                    </tr>
                        
                    <tr>
                        <td>USD</td>
                        <td>{rate.USD}</td>
                    </tr>
                    <tr>
                        <td>EUR</td>
                        <td>{rate.EUR}</td>
                    </tr>
                </table>
             </div>
         )
     }
     else
     return "exchange data not loaded"
}

export default Currency
