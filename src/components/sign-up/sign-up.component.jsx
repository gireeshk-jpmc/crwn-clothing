import React from 'react';
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth, creatUserProfileDocument} from '../../firebase/firebase.utils';

class SignUp extends React.Component{

    constructor(props){
        super(props);

        this.state={
            displayName:'',
            email:'',
            password:'',
            confirmPassword:''
        }
    }

    handlesubmit = async event =>{
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if(password!==confirmPassword){
            alert("password don't match");
            return;
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await creatUserProfileDocument(user, {displayName});
            this.setState(
                this.state={
                    displayName:'',
                    email:'',
                    password:'',
                    confirmPassword:''
                }
            );

        }
        catch(error){
            console.log('error', error.message);
        }
    }

    handleChange = event =>{
        const {name, value} = event.target;
        this.setState({[name]:value});
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I don't have an account</h2>
                <span>Sign Up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handlesubmit}>
                    <FormInput type='text' name='displayName' value={displayName} label='Display Name' onChange={this.handleChange} required/>
                    <FormInput type='email' name='email' value={email} label='Email' onChange={this.handleChange} required/>
                    <FormInput type='password' name='password' value={password} label='Password' onChange={this.handleChange} required/>
                    <FormInput type='password' name='confirmPassword' value={confirmPassword} label='Confirm Password' onChange={this.handleChange} required/>
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;