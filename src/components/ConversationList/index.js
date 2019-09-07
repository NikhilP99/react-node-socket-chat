import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
// import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import {Button, ButtonGroup} from 'react-bootstrap'

import './ConversationList.css';

export default class ConversationList extends Component {

  state = {
    category: 'chats'
  }

  render() {
    return (
      <div className="conversation-list">
        <Toolbar
            title="Messenger"
            leftItems={[
              <ToolbarButton key="cog" icon="ion-ios-cog" />
            ]}
            rightItems={[
              <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
            ]}
          />
          <ConversationSearch />

          <ButtonGroup>
            <Button value='chats' onClick={()=>{this.setState({category: 'chats'})}}>Chats</Button>
            <Button value='online' onClick={()=>{this.setState({category: 'online'})}}>Online</Button>
          </ButtonGroup>

        {(this.state.category === 'online')?
          (this.props.users.map(user =>{
            return(
              <div key={user.id}>
              <div className="conversation-list-item">
              <div className="conversation-info">
              <h1 className="conversation-title">{ user.name }</h1>
              <p className="conversation-snippet">Active</p>
              </div>
              </div>
              </div>
            )}
          )):

          (this.props.chats.map(chat =>{
            if(chat.name){
              const lastMessage = chat.messages[chat.messages.length - 1];
              const chatSideName = chat.users.find((name)=>{
									return name !== this.props.user.name
								}) || "Community"
								const classNames = (this.props.activeChat && this.props.activeChat.id === chat.id) ? 'active' : ''
              return(
                <div key={chat.id} onClick={ ()=>{ this.props.setActiveChat(chat) } }>
                <div className={`conversation-list-item ${classNames}`}>
                <div className="conversation-info">
                <h1 className="conversation-title">{chatSideName}</h1>
                {lastMessage ? (<p className="conversation-snippet">{lastMessage.message}</p>):''}
                </div>
                </div>
                </div>
              )
          }

          return null

            }
          ))

        }
      </div>
    );
  }
}










// getConversations = () => {
//   axios.get('https://randomuser.me/api/?results=20').then(response => {
//     this.setState(prevState => {
//       let conversations = response.data.results.map(result => {
//         return {
//           photo: result.picture.large,
//           name: `${result.name.first} ${result.name.last}`,
//           text: 'Hello world! This is a long message that needs to be truncated.'
//         };
//       });
//
//       return { ...prevState, conversations };
//     });
//   });
// }


// <Toolbar
// title="Messenger"
// leftItems={[
//   <ToolbarButton key="cog" icon="ion-ios-cog" />
// ]}
// rightItems={[
//   <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
// ]}
// />
// <ConversationSearch />
