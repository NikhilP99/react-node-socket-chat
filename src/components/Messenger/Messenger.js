import React, {Component} from 'react'
import './Messenger.css';
import ConversationList from '../ConversationList';


class Messenger extends Component {

  state = {
    users: [],
    activeChat: null
  }

  componentDidMount(){
    this.updateUserList()
  }

  updateUserList = () => {
    this.props.socket.on('UPDATE_USERLIST',(users) => {
    this.setState({users: users.users})
  })
  }

  setActiveChat = (chat) => {
    this.setState({activeChat: chat})
  }

  render(){

    return(
      <div className="messenger">

      {this.state.users ? (
        <div className="scrollable sidebar">
        <ConversationList users={this.state.users}
          user={this.props.user}
          logout={this.props.logout}
          setActiveChat={this.setActiveChat}
          activeChat={this.activeChat}/></div>): ''}



      </div>
    )
  }

}


export default Messenger


// <div className="scrollable content">
// <MessageList />
// </div>

// render(){
//   let users = this.state.users
//   return(
//     <div>
//     <h2>welcome {this.props.user.name}</h2>
//
//     <h4>Connected Users</h4>
//
//     {users.users ? (<ul>
//       {users.users.map(user => {
//         return (
//           <div key={user.id}>
//           {user.name}
//           </div>
//         )
//       })}
//       </ul>):"no users"}
//
//       </div>
//     )
//   }
