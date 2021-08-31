import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './components/Login';
import FavCrypto from './components/FavCrypto';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      AddedData: [],
      name: '',
      img: '',
      price: '',
      description: '',
    }
  }

  addToWatchList = (items) => {
    this.setState({
      name: items.title,
      img: items.image_url,
      price: items.toUSD,
      description: items.description,
    })
    const data = {
      name: items.title,
      img: items.image_url,
      price: items.toUSD,
      description: items.description,
    }
    const config = {
      method: 'post',
      baseURL: 'https://enterance-exam-401.herokuapp.com/',
      url: '/favCrypto',
      data: data
    }
    axios(config).then(res => {
      console.log(res.data);
      this.setState({
        AddedData: res.data,
      })
    })
  }

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
              {isAuthenticated ? <Home addToWatchList={this.addToWatchList} /> : <Login />}
            </Route>
            <Route exact path="/crypto-list">
              {/* TODO: if the user is logged in, render the `FavFlowers` component, if they are not, render the `Login` component */}
              {isAuthenticated ? <FavCrypto
                name={this.state.name}
                img={this.state.img}
                price={this.state.price}
                description={this.state.description} /> : <Login />}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
