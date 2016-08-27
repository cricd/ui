import React, { Component } from 'react';
import './Score.css';
import io from 'socket.io-client'


class Score extends Component {

  constructor(props, context) {
    
    super(props, context);
    this.state = {
      match: 16,
      score: "",
    };
  this.onChange = this.onChange.bind(this)
  // Subscribe any client to a match subscription
  var socket = io.connect('http://localhost:3100?match=' + this.state.match);
    socket.on('score-change', this.onChange)
  }

 onChange(data) {
   console.log(data);
   this.setState({score: data.score.innings[1]});
   console.log(this.state.score)
 }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Current score</h2>
          <p> {this.state.score.runs} / {this.state.score.wickets} off  {this.state.score.over}.{this.state.score.ball}  </p>
        </div>
      </div>
    );
  }
}

export default Score;

