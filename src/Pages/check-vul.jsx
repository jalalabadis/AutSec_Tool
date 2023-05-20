import React, { useState, useEffect } from "react";

import "../Css/checkVul.css"
import {  getDatabase, onValue, ref } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../firebase";
import { Link, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';


const Checkvul = () => {
ReactGA.initialize('UA-256865843-1');
ReactGA.pageview(window.location.pathname + window.location.search);
    const db = getDatabase();
    const navigate = useNavigate();
    const [userPlan, setUserPlan]=useState();
    const [contractCode, setContractCode] = useState("");
    const [results, setResults] = useState({});


    //> UseEffect
    useEffect(()=>{
onAuthStateChanged(auth, user=>{
if(user){
onValue(ref(db, 'User/'+user.uid), snapshot=>{
if(snapshot.exists()){
setUserPlan(snapshot.val().Plan)
if(Date.now()>snapshot.val().ExpireDate){
navigate('/subscription');
}
}
});
}
});

    },[]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("https://autsec.herokuapp.com/check_vulnerability", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ contract_code: contractCode }),
        })
        .then((response) => response.json())
        .then((data) => {
            setResults(data);
        });
    };
    
    const handleClear = () => {
        setContractCode("");
        setResults({});
        document.getElementById("contractCode").innerHTML = "";
    };
    
    return (
        <div className="App">
            <p>My Plan: <Link to={'/subscription'}>{userPlan?userPlan:"Upgrade Plan"}</Link></p>
            <form onSubmit={handleSubmit}>
                <div className="smart-contract-input-container">
                <div className="smart-contract-input-header">
                    <h3>Enter Smart Contract</h3>
                    <p>Please paste your smart contract code in the text box below</p>
                </div>
                <div className="smart-contract-input-body">
                    <div className="smart-contract-code-container">
                    <div
                        className="smart-contract-code"
                        contentEditable={true}
                        suppressContentEditableWarning={true}
                        id="contractCode"
                        onInput={(e) => setContractCode(e.target.innerText)}
                    >
                        {contractCode}
                    </div>
                    </div>
                    <div className="smart-contract-actions">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={() => {
                        document
                            .getElementById("api-info")
                            .scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                    >
                        Submit
                    </button>
        
                    <button
                        className="btn btn-secondary"
                        type="reset"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                    </div>
                </div>
                </div>
            </form>
            <div className="results-container" id="api-info">
                {Object.keys(results).map((key) => (
                <div className="result-box" key={key}>
                    <p>
                    <strong>{key}:</strong> {results[key]}
                    </p>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Checkvul;
