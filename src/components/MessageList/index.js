import React, { Component } from 'react';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';

import './MessageList.css';


export default class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: ''
    };
  }

  componentDidMount() {
    this.setState({
      messages: this.props.activeChat.messages
    })
  }

  handleSubmit = (e)=>{
		e.preventDefault()
    if(this.state.message === ''){
      return
    }
		this.sendMessage()
		this.setState({message:""})
	}

	sendMessage = ()=>{
		this.props.sendMessage(this.props.activeChat.id,this.state.message)
	}

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let current = this.state.messages[i];
      let isMine = current.author.name === this.props.user.name;

      messages.push(
        <Message
          key={i}
          isMine={isMine}
          data={current}
        />
      );
      i += 1;
    }
    return messages;
  }

  render() {
    return(
      <div className="message-list">
        <Toolbar
          title={this.props.activeChat.name}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        <div className="message-list-container">{this.renderMessages()}</div>

        <div className="compose">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={(e)=>{this.setState({message:e.target.value})}}
            value={this.state.message}
            className="compose-input"
            placeholder="Type a message"
          />
          </form>
        </div>
      </div>
    );
  }
}
