import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { MDBContainer,MDBTabs,MDBTabsItem,MDBTabsLink,MDBTabsContent,MDBTabsPane,MDBBtn,MDBIcon,MDBInput,MDBCheckbox } from 'mdb-react-ui-kit';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile,signInWithPopup,GoogleAuthProvider, GithubAuthProvider,getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

//> Alert 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { showError,showSuccess } from '../Utils/Alerts';
import { child, get, getDatabase, update, ref } from 'firebase/database';

const Login = () =>  {

    //> Use Navigate 
    const navigate = useNavigate();

    //> Firebase Variable
    const db= getDatabase();
    const [FreeExpireDay, setFreeExpireDay]= useState(0);
    const [PlanName, setPlanName]= useState('No Plan');
    const [PlanID, setPlanID]=useState('0');
    const googlprovider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    //> Use State
    const [displayName,setDisplayName] = useState("");
    const [email,setEmail] = useState("");
    const [pswd,setPswd] = useState("");
    const [justifyActive, setJustifyActive] = useState('tab1');;

    const handleJustifyClick = (value) => {
        if (value === justifyActive) { 
            setDisplayName("")
            setEmail("")
            setPswd("")
            setJustifyActive("")
            return;}
        setJustifyActive(value);
    };

    //> UseEffect
    useEffect(()=>{
onAuthStateChanged(auth, (user)=>{
if(user){
get(child(ref(db), 'User/'+user.uid)).then(snapshot=>{
if(snapshot.exists()){
    console.log("User data alredy Add")
}
else{
   update(ref(db, 'User/'+user.uid), {
    UserID: user.uid,
    email: user.email,
    displayName: user.displayName!==null? user.displayName : displayName,
    Plan: PlanName,
    PlanID: PlanID,
    Position: 'Player',
    BuyDate: Date.now(),
    ExpireDate: Date.now()+(FreeExpireDay*24*60*60*1000)
   });
}
});
}
});
if(localStorage.getItem("isLogin")){
 navigate('/checkvul');
}  

////////Set Register Expire Day
get(child(ref(db), 'Register_Plan')).then(snapshot=>{
if(snapshot.exists()){
get(child(ref(db), 'Plan_list/'+snapshot.val().ID)).then(snapshot=>{
        if(snapshot.exists()){
setFreeExpireDay(snapshot.val().Duration);
setPlanName(snapshot.val().Name);
setPlanID(snapshot.val().ID);
        }});
}
});
},[FreeExpireDay, displayName, PlanID, PlanName]);

    //> Handle Functions 

    const handleSignUpForm = (e) => {
        e.preventDefault()

        if(displayName && email && pswd){
            createUserWithEmailAndPassword(auth, email, pswd)
            .then((res) => {
                updateProfile(auth.currentUser, {displayName: displayName})
                .then((resp2) => {console.log(resp2)})
                .catch((error) => {});
                showSuccess("User Added ")
            })
            .catch((error) => {
                showError(error.code)
                //console.log(error.code);
                //console.log(error.message);
            });
        }
        else{
            console.log("Fill all Fields ")
        } 
    }

    const handleSignInForm = (e) => {
        e.preventDefault()

        if(email && pswd){
            signInWithEmailAndPassword(auth, email,pswd)
            .then((res) => {
                localStorage.setItem("isLogin",true)
                navigate('/checkvul');
            })
            .catch((error) => {
                if(error.code == 'auth/wrong-password'){
                    showError("Invalid Email / Password")
                }
            });
        }
        else{
            showError("Fill all Fields ")
        }
  
    }

    const handleGoogleSignIn = (e) => {
        signInWithPopup(auth, googlprovider)
        .then((result) => {
            localStorage.setItem("isLogin",true)
            navigate('/checkvul');            
        }).catch((error) => {
            showError(error.code);
        });
    }

    const handleGithubSignIn = (e) => {
        signInWithPopup(auth, githubProvider)
        .then((result) => {
            localStorage.setItem("isLogin",true)
            navigate('/checkvul');
        }).catch((error) => {
            showError(error.code);
        });
    };

    return (
        <>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                            Login
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                            Register
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>

                    <MDBTabsPane show={justifyActive === 'tab1'}>

                        <div className="text-center mb-3">
                            <p>Sign in with:</p>

                            <div className='d-flex justify-content-between mx-auto' style={{width: '40%'}}>
                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={handleGoogleSignIn}>
                                    <MDBIcon fab icon='google' size="sm"/>
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }} onClick={handleGithubSignIn}>
                                    <MDBIcon fab icon='github' size="sm"/>
                                </MDBBtn>
                            </div>

                            <p className="text-center mt-3">or:</p>
                        </div>

                        <form onSubmit={handleSignInForm} autoComplete="off">
                            
                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'    onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                            <MDBInput wrapperClass='mb-4' label='Password'      id='form2' type='password' onChange={(e) => setPswd(e.target.value)} autoComplete="new-password" />

                            {/*<div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                <a href="!#">Forgot password?</a>
                                </div>*/}

                            <MDBBtn className="mb-4 w-100" type="submit">Sign in</MDBBtn>
                        </form>
                        {/*<p className="text-center">Not a member? <a href="#!">Register</a></p>*/}

                    </MDBTabsPane>

                    <MDBTabsPane show={justifyActive === 'tab2'}>
                        
                        <form onSubmit={handleSignUpForm}>
                            <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'         onChange={(e) => setDisplayName(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'       onChange={(e) => setEmail(e.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' onChange={(e) => setPswd(e.target.value)} />

                            {/*<div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
                            </div>*/}

                            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
                        </form>

                    </MDBTabsPane>

                </MDBTabsContent>

            </MDBContainer>
            <ToastContainer/>
        </>
    );
}

export default Login;

// This gives you a Google Access Token. You can use it to access the Google API.
//const credential = GoogleAuthProvider.credentialFromResult(result);
//const token = credential.accessToken;
// The signed-in user info.
//const user = result.user;


// This gives you a Google Access Token. You can use it to access the Google API.
//const credential = GithubAuthProvider.credentialFromResult(result);
//const token = credential.accessToken;
// The signed-in user info.
//const user = result.user;