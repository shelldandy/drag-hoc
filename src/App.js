import React, { Component } from 'react'

import './app.css'
import logo from './logo.png'
import DragUsage from './DragUsage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-Static</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <DragUsage />
      </div>
    )
  }
}

export default App
