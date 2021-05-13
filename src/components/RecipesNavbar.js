
import { Nav, Navbar } from 'react-bootstrap';
import React from 'react';

class RecipesNavbar extends React.Component {
    constructor(props){
        super(props);
        
    }
    render() {
        // Show the user management links conditionally;
        // If activeUser, then a user is logged in
        // If activeUser Does not exist - Render login + signup
        // If active user exist - Render signout
        const loginEl = ( ! this.props.activeUser) ? <Nav.Link href="/#/login">Login</Nav.Link> : null
        const signupEl = ( ! this.props.activeUser) ? <Nav.Link href="/#/signup">Signup</Nav.Link> : null
        const nameEl = (this.props.activeUser) ? <Nav.Link >Hello {this.props.activeUser.name}</Nav.Link> : null
        const logoutEl = (this.props.activeUser) ? 
        <Nav.Link href="/#/" onClick = {() => this.props.logout()}>
            Log out
            </Nav.Link>
            : null

        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/#/">My Recipe Book</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/#/recipes">Recipes</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {loginEl}
                        {signupEl}
                        {logoutEl}
                        {nameEl}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default RecipesNavbar;