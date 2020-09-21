import React, { Component } from 'react';
import {
  BrowserRouter, Switch, Route 
} from "react-router-dom";
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Home from './components/Home'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/cart" component={Cart}/>
            </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;
