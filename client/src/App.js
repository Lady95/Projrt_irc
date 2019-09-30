import React from 'react'
import Form from './Components/FormUser.js';
import FormMessage from './Components/Form-message.js';
import Display from './Components/display-chat';
import Nav from './Components/nav';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      endpoint : "http://localhost:4000",
      user : '',
    }
    
    this.changeData = this.changeData.bind(this)
  }
  changeData(newData) {
    this.setState({user: newData})
  }
  
  render() {
    if(this.state.user !== '') {
      return (
        <div style={{ textAlign: "center"}}>
          <Nav user={this.state.user}/>
          <h3 className="font-weight-bold m-3">{this.state.user}</h3>
          <div style={{marginBottom: "50px"}}>
            <Display user={this.state.user} endpoint = {this.state.endpoint}  />
          </div>
          <div style={{marginTop: "50px"}}>
          <FormMessage user={this.state.user} changeFunction = {this.changeData} endpoint = {this.state.endpoint}/>
          </div>

        </div>
      )
    } else {
      return (
        <div style={{ textAlign: "center"}}>
          <Nav />
          <h2 className="m-5"> Welcome to Chat app</h2>
          <Form functionData = {this.changeData} endpoint={this.state.endpoint} />
        </div> 
      )
    }
  }
}

export default App
