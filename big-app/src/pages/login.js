import React, { Component } from 'react';
import "../css/login.css";

class Login extends Component {

    onSubmitButtonClick = () => {
        if(document.getElementById("userName").value != "" && document.getElementById("password").value != ""){
            window.location.href = "/list";
        }
        else {
            document.getElementById("info").style.opacity = 1
        }
    }

    render() {
        return (
            <div id="loginPage">
                <div class="loginBoxWrapper">
                    <input placeholder="UserName" id="userName" />
                    <input placeholder="Password" id="password" />
                    <button value="submit" onClick={this.onSubmitButtonClick}>Submit</button>
                    <div id="info" style={{ opacity: 0, color: "#FF0001" }}>Fields are empty</div>
                </div>
            </div>
        )
    }
}

export default Login;