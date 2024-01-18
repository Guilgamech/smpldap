import React,{Component} from 'react';

import NavBar from './components/structure/nav_bar/nav_bar';
import Routes from './components/structure/Router/Router';
//import Footer from './components/structure/footer/footer';
//import Login from './components/login/login';
import 'element-theme-default';
import './App.css';
import { connect } from 'react-redux';

class App extends Component {
  state = { user:{} }
  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'))||{};
    this.setState({user});
  }
  
  render() { 
    return (
      <div>
        <NavBar />
        <main>
          <Routes />
        </main>
        {/*<Footer />*/}
      </div>
    );
  }
}

export default connect()(App);
