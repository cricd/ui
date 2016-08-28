import React, { Component } from 'react';
import './Score.css';
import io from 'socket.io-client'


class Score extends Component {

  constructor(props, context) {
    
    super(props, context);
    this.state = {
      score: {"over": 0, 
              "ball": 0, 
              "runs": 0, 
              "wickets": 0,
              "bowlingTeam": {"id": 0, "name": "-"},
              "battingTeam": {"id": 0, "name": "-"}
            },
      innings: this.props.innings
  };
  this.onChange = this.onChange.bind(this)
  // Subscribe any client to a match subscription
  var socket = io.connect('http://localhost:3100?match=' + this.props.match);
    socket.on('score-change', this.onChange)
  }

 onChange(data) {
  if(data.score.innings[this.state.innings]) {
    this.setState(
      {score: data.score.innings[this.state.innings]},
      );
    }
 }
  render() {
    return (
        <div className="Score">
          <h2>Innings: {this.state.innings}</h2>
          <h3> {this.state.score.battingTeam.name} </h3>  
          <p> {this.state.score.runs} / {this.state.score.wickets} off  {this.state.score.over}.{this.state.score.ball}  </p>
        </div>
    );
  }
  }

export default Score;

