import React, { Component } from 'react';

import './ConversationListItem.css';

export default class ConversationListItem extends Component {

  render() {
    const { name } = this.props

    return (
      
      <div className="conversation-list-item">
      <div className="conversation-info">
      <h1 className="conversation-title">{ name }</h1>
      </div>
      </div>
    );
  }
}










// <div className="conversation-list-item">
// <img className="conversation-photo" src={photo} alt="conversation" />
// <div className="conversation-info">
// <h1 className="conversation-title">{ name }</h1>
// <p className="conversation-snippet">{ text }</p>
// </div>
// </div>
