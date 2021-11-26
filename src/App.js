import React, { Component } from 'react';
import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  clearUsers = () => this.setState({ users: [], loading: false });

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type,
      },
    });

    setTimeout(() => this.setState({ alert: null }), 2000);
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });

    if (!text) {
      this.setAlert('Please enter something', 'light');
    } else {
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
      );

      this.setState({
        users: res.data.items,
        loading: false,
      });
    }
  };

  render() {
    const { users, loading, alert } = this.state;

    return (
      <div className='App'>
        <NavBar icon='fab fa-github' title='Github Finder' />
        <div className='container'>
          <Alert alert={alert} />
          <Search
            clearUsers={this.clearUsers}
            searchUsers={this.searchUsers}
            setAlert={this.setAlert}
            showClear={!!users.length}
          />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
