import React from 'react';
import { Button, Col,  Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            pwd: ''
        }
    }
    updatePass  = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    updateEmail  = (event) => {
        this.setState({
            pwd: event.target.value
        })
    }
    handleLogin = () => {
        // Checks the typed username and password from the controlled components
        // check if user exists in this.props.allUsers, and if the password is correct
        // if true returns the user onject
        // if false - show alert - password / user not found
        const foundUser = this.props.allUsers.find( (user) => {
           return user.email === this.state.email && user.pwd === this.state.pwd;
        });
        //alternatively for syntax
        // for(let i=0; i<this.props.allUsers.length; i++){
            // if(user.email === this.state.email && user.pwd === this.state.pwd){
             //   foundUser = yhis.props.allUsers[i];
             //   break;
         //   }
      //  }
        if(foundUser) {
            this.props.login(foundUser);
            window.location.href = '/#/recipes';
        }
        else{
            alert(" Incorrect Email or password");
        }
    }
    render() {
        return (
            <div className="p-login">
                <h1>Login to My Recipe Book</h1>
                <Form className="mt-5">
                    <Form.Group as={Row} controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                        Email
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="email" placeholder="Email" onChange={this.updatePass} value={this.state.email}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formHorizontalPassword" >
                        <Form.Label column sm={2}>
                        Password
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="password" placeholder="Password" onChange={this.updateEmail} value={this.state.pwd}/>
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button onClick={this.handleLogin} variant="success" type="button">Log in</Button>
                        </Col>
                    </Form.Group>
                </Form>
                <Link to="/signup">Sign up</Link>
            </div>
        )
    }
}

export default Login;