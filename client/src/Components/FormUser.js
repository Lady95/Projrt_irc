import React from 'react'; 
import socketIOClient from 'socket.io-client';
import { FormGroup, FormLabel, FormControl, Form, Button} from 'react-bootstrap';
import logo from './chat.png';

export default class FormUser extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '', 
        };
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({username: event.target.value})
    }
    
    handleSubmit(event) {
        const user = this.state.username;
        const socket = socketIOClient(this.props.endpoint);
        socket.emit('username', user.charAt(0).toUpperCase().trim() + user.slice(1))
        event.preventDefault(); 
        
        socket.on('user', (msg) => {
            this.props.functionData(msg); 
            
        })
    }
    
    render() {
        return (
            <div>
                <img className="Logo" src={logo} alt="logo"/>
                <Form className="m-5" onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <FormLabel className="font-weight-bold">Username</FormLabel>
                    <FormControl
                        id="user"
                        type="text"
                        label="Username"
                        placeholder="Enter your username"
                        value={this.state.value}
                        onChange={this.handleChange}
                        autoComplete="off"
                    />
                    </FormGroup>
                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
            );
        }
    }