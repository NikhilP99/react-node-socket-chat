import React,{Component} from 'react';
import Login from './components/Login'
import io from 'socket.io-client'
import Messenger from './components/Messenger/Messenger'


class App extends Component {

  state = {
    user: null,
    socket: null,
  }

  componentDidMount(){
    this.initSocket()
  }

  initSocket = async () => {
    let socket = io('http://localhost:8000')
		socket.on('connect', ()=>{
			console.log("Socket connected");
		})
     await this.setState({socket})
  }

  setUser = (user)=>{
		this.state.socket.emit("USER_CONNECTED", user);
		this.setState({user})
	}

  logout = () => {
    this.state.socket.emit('LOGOUT')
      this.setState({
        user: null,
      })
  }

  render(){
    return(
      <div>{
        this.state.socket ?
        (<div>
        {
          (!this.state.user) ?
          <Login socket={this.state.socket} setUser={this.setUser} /> :
          <Messenger user={this.state.user} socket={this.state.socket} logout={this.logout} users={this.state.users}/>
        }
        </div>):'Loading...'
      }
      </div>
    )
  }
}

export default App;
