import React from 'react';
import '../message.css';
import socketIOClient from 'socket.io-client'; 
import { Col, FormControl, Form, Button, Row} from 'react-bootstrap';

export default class FormMessage extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            message : '',
            messages : []
        };

        this.messageChange = this.messageChange.bind(this)
        this.messageSubmit = this.messageSubmit.bind(this)
    }

    messageChange(event) {
        this.setState({message: event.target.value})
    }

    messageSubmit(event) {

        const socket = socketIOClient(this.props.endpoint);

        let msg = this.state.message; 
        let word = msg.split(' ');

        if(msg !== ''){
            if(word[0] === "/nick" &&  word[1] !== ''){
                var NewUserName = word[1].charAt(0).toUpperCase().trim() +  word[1].slice(1); 
 
                socket.emit('username', NewUserName, this.props.user, word[0]); 
                socket.on('user', (data) => {
                    this.props.changeFunction(data); 
                })

                socket.emit('chat message',
                { 
                    user : this.props.user,
                    message : 'is now known as  ' + NewUserName 
                   
                } );
                this.setState({message: ''});

            } else if(word[0] === "/users") {
                socket.on('users', (data) => {
                    socket.emit('chat message',
                    { 
                        user : this.props.user,
                        message : 'Users connect : ' + data + ' ' 
                    });
                })
                this.setState({message: ''});
            } else {
                socket.emit('chat message',
                { 
                    user : this.props.user,
                    message : this.state.message 
                });

            event.preventDefault();  
            this.setState({message: ''});
            }
        }
        event.preventDefault();  

    }

    render() {
        return(
            <div className="message">
                <Form onSubmit={this.messageSubmit}>
                    <Row>
                        <Col sm={8}> 
                            <FormControl
                                size="lg"
                                type="text" 
                                placeholder="Enter message...."
                                value={this.state.message} 
                                onChange={this.messageChange} 
                            />
                        </Col>
                        <Col sm={4}>
                            <Button variant="primary" type="submit" size="lg" block>
                                Send
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}