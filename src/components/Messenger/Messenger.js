import React, {Component} from 'react'
import './Messenger.css';
import ConversationList from '../ConversationList';
// import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Messenger extends Component {

  state = {
    users: [],
    activeChat: null,
    chats: []
  }

  componentDidMount(){
    this.props.socket.emit('COM_CHAT', this.resetChat)
    this.updateUserList()
  }

  resetChat = (chat) => {
    this.addChat(chat,true)
  }

  addChat = (chat, reset = false)=>{
  const { chats } = this.state

  const newChats = reset ? [chat] : [...chats, chat]
  this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

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

  render(){

    return(
      <Row style={{marginLeft: 0,marginRight: 0, height:window.innerHeight}}>
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

      <Col md={8}>
        
      </Col>
      </Row>
    )
  }

}


export default Messenger
