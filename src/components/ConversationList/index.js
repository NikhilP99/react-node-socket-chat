import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
// import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import {Button, ButtonGroup} from 'react-bootstrap'

import './ConversationList.css';

export default class ConversationList extends Component {

  state = {
    category: 'chats',
    newReceiver : null
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
            if(user.id !== this.props.user.id){
              return(
                <div key={user.id} onClick={() => {this.props.addPrivateChat({id:user.id, name: user.name})}}>
                <div className="conversation-list-item">
                <div className="conversation-info">
                <h1 className="conversation-title">{ user.name }</h1>
                <p className="conversation-snippet">Active</p>
                </div>
                </div>
                </div>
              )}
              else return null

            }
          )):

          (this.props.chats.map(chat =>{
            if(chat.name){
              const lastMessage = chat.messages[chat.messages.length - 1];
              const receiver = chat.users.find((user)=>{
									return user.name !== this.props.user.name
								})
              const chatSideName = (receiver && receiver.name) ? (receiver.name):('Community')
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
