import React, {Component} from 'react'

class Login extends Component {

  state = {
    error: "",
    name: ""
  }

  setUser = (res) => {
		if(res.isAlreadyUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(res.user)
		}
	}

	handleSubmit = (e)=>{
		e.preventDefault()
		const { socket } = this.props
		const { name } = this.state
    if (name === '' || null) return 
		socket.emit("VERIFY_USER", name, this.setUser)
	}

	handleChange = (e) => {
		this.setState({name:e.target.value})
	}
  setError = (error)=>{
		this.setState({error})
	}

  render(){
    return(
      <div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >
					<label htmlFor="name">
						<h2>Got a name?</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }}
						type="text"
						id="nickname"
						value={this.state.name}
						onChange={this.handleChange}
						placeholder={'enter your name here'}
						/>
						<div className="error">{this.state.error ? this.state.error:null}</div>

				</form>
			</div>
    )
  }
}



export default Login
