import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RecipesPage from './pages/RecipesPage';
import HomePage from './pages/HomePage';
import RecipesNavbar from './components/RecipesNavbar';
import { Container } from 'react-bootstrap';
import userJSON from './data/users.json';
import RecipesJSON from './data/recipes.json';

// App is the main component for our Recipe app
// State:
// activeUser: Either null, if no user is logged in, or a user object if a user is logged in

class App extends React.Component {

  constructor(props){
    super(props);
    let usersData;
    // if ( localStorage['allUsers']) {usersData=localStorage['allUsers'];}
    // else {usersData=userJSON}

    // 1) When adding new recipes, we updated localStorage.localRecipes, 
    // to have all the previous trcipes pluse the new one. We saved this information as a string
    // 2) When loading the page: We check if we have localStorage info.
          // if we have, we use the localStorage info and ignore the JSON
          // if we don't, we simply use the JSON data
    let recipesData = [];
    if(localStorage.localRecipes) {
      recipesData = JSON.parse(localStorage.localRecipes)
    }
    else {
      recipesData = RecipesJSON;
    }
    this.state = {
      allUsers: usersData,
      allRecipes: recipesData,
      // activeUser: null
      activeUser: {
        id: 1,
        name: 'Yaron',
        email: 'skarlinski@gmail.com',
        pwd: '123'
      }
    }
  }
  addUser = (newUser) => {
    this.setState({
      activeUser: newUser,
      allUsers: this.state.allUsers.concat(newUser)
    })
    localStorage['allUsers'] = localStorage['allUsers'].push(newUser); //will not work bacouse local storage is string
  }
  addRecipe = (newRecipe) => {
    // NewRecipe in an object name, desc, img, userId, id
    const localRecipesString = JSON.stringify(this.state.allRecipes.concat(newRecipe));
    localStorage.localRecipes = localRecipesString;

    this.setState({
      allRecipes: this.state.allRecipes.concat(newRecipe)
    })
  }
  login = (userObj) => {
    this.setState({
      activeUser: userObj
    });
  }
  logout = () => {
    this.setState({
      activeUser: null,
    });
  }
    render() { 
      return (
      <HashRouter>
        <Route exact path={['/', '/recipes']}>
          <RecipesNavbar 
          activeUser={this.state.activeUser}
          logout={this.logout}/>
        </Route>
        <Container>
          <Route exact path="/">
            <HomePage></HomePage>
          </Route>
          <Route exact path="/login">
            <Login 
              allUsers={this.state.allUsers} 
              login={this.login}
            />
          </Route>
          <Route exact path="/signup">
            <Signup addUser={this.addUser}/>
          </Route>
          <Route exact path="/recipes">
            <RecipesPage 
            activeUser={this.state.activeUser}
            allRecipes={this.state.allRecipes}
            addRecipe={this.addRecipe}
            >
            </RecipesPage>
          </Route>
        </Container>
      </HashRouter>
      );
  }
}

export default App;
