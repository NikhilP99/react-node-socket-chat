import React, {Component} from 'react'
import './Messenger.css';
import ConversationList from '../ConversationList';
// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import MessageList from '../MessageList';

let height

class Messenger extends Component {

  state = {
    users: [],
    activeChat: null,
    chats: []
  }

  componentDidMount(){
    height = window.innerHeight
    this.props.socket.emit('COM_CHAT', this.resetChat)
    this.updateUserList()
    this.scrollDown()
  }

  componentDidUpdate(){
    this.scrollDown()
  }

  resetChat = (chat) => {
    this.addChat(chat,true)
  }

  addChat = (chat, reset = false)=>{
  const { chats } = this.state

  const newChats = reset ? [chat] : [...chats, chat]
  this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

  const messageEvent = `NEW_MSG-${chat.id}`
  this.props.socket.on(messageEvent, (message)=>{this.addMessageToChat(chat.id,message)})

  }

  addMessageToChat = (chatId,message) => {
      const { chats } = this.state
			let newChats = chats.map((chat)=>{
				if(chat.id === chatId)
					chat.messages.push(message)
          console.log(chat.messages);
				return chat
			})

			this.setState({chats:newChats})
  }

  updateUserList = () => {
    this.props.socket.on('UPDATE_USERLIST',(users) => {
    this.setState({users: users.users})
  })
  }

  setActiveChat = (chat) => {
    this.setState({activeChat: chat})
    console.log(this.state.activeChat);
  }

  sendMessage = (chatId, message) => {
    this.props.socket.emit('MESSAGE_SENT', {chatId, message} )
  }

  scrollDown = () => {
		const { container } = this.refs
		container.scrollTop = container.scrollHeight
	}

  render(){

    return(
      <Row style={{marginLeft: 0,marginRight: 0, height:height}}>
      <Col md={4} >
      {this.state.users ? (
        <div className="scrollable sidebar">
        <ConversationList users={this.state.users}
          user={this.props.user}
          logout={this.props.logout}
          chats={this.state.chats}
          setActiveChat={this.setActiveChat}
          activeChat={this.state.activeChat}/></div>): ''}
      </Col>

      <Col md={8} style={{height: height}}>
      <div className="scrollable content" style={{height: height}} ref='container'>
        {this.state.activeChat && <MessageList activeChat={this.state.activeChat}
                                                user={this.props.user}
                                                sendMessage={this.sendMessage} />}
      </div>
      </Col>
      </Row>
    )
  }

}


export default Messenger
