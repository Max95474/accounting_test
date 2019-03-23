import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      history: []
    }
  }
  render() {
    return (
      <div className="App">
        <ul>
          {
            this.state.history.map(item => {
              return (
                <li key={item.id}>
                  <div className='button__container'>
                    <button className='button'>
                      {`ID: ${item.id} Date: ${item.effectiveDate} Type: ${item.type} Amount: ${item.amount}`}
                    </button>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
  async componentDidMount() {
    const history = await axios.get('http://localhost:3001/transaction')
    this.setState({history: history.data})
  }
}

export default App;
