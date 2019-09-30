import React from 'react';
import socketIOClient from 'socket.io-client'; 

export default class DisplayChat extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            messages : [],
        };

        const socket = socketIOClient(this.props.endpoint);
        socket.on('chat message', (msg) => {

            this.setState({messages: 
                [...this.state.messages, 
                    {
                        'user': msg.user, 
                        'msg' : msg.message,
                    }
                ]
            }); 
        })
        this.displayMessage = this.displayMessage.bind(this);
    }
    
    displayMessage = () => {
        const arr = this.state.messages.map((msg, index) => <li key={index}> <h4>{msg.user} :</h4> <p>{msg.msg}</p></li>)
        return arr; 
    }

    render() {
        return (
             <div>
                  <div>
                    <ul id="messages">{this.displayMessage()}</ul>
                 </div>
             </div>
        );
    }
}