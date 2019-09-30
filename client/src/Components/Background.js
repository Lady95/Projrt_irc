import React from 'react'
import socketIOClient from 'socket.io-client'

export default class Background extends React.Component {
    constructor() {
        super()
        this.state = {
            endpoint: "http://localhost:4000",
            color: 'white'
        };
    }
    
    // sending sockets
    send = () => {
        const socket = socketIOClient(this.state.endpoint);
        socket.emit('change color', this.state.color) // change 'red' to this.state.color
    }
    ///
    
    // adding the function
    setColor = (color) => {
        this.setState({ color })
    }
    
    componentDidMount = () => {
        const socket = socketIOClient(this.state.endpoint);
        setInterval(this.send(), 1000)
        socket.on('change color', (col) => {
            document.body.style.backgroundColor = col
        })
    }
    
    // render method that renders in code if the state is updated
    render() {
        const socket = socketIOClient(this.state.endpoint);
        socket.on('change color', (col) => {
            document.body.style.backgroundColor = col
        })
        return (
            <div style={{ textAlign: "center" }}>
                <button onClick={() => this.send() }>Change Color</button>
                <button id="blue" onClick={() => this.setColor('blue')}>Blue</button>
                <button id="red" onClick={() => this.setColor('red')}>Red</button>
            </div>
            )
        }
        
    }