import React from 'react';
import { NavbarBrand, Navbar, Button, Form} from 'react-bootstrap';
import logo from './chat.png';

export default function Nav(props){

    function verify() {
        if(props.user){
           return (
            <Form>
                <Button type="submit">deconnect</Button>
            </Form>
            );
        }
    }
    return (
        <Navbar bg="dark" variant="dark">
            <NavbarBrand>
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />
            {' Chat App'}
            </NavbarBrand>
            
            <div>
                {verify()}
            </div>
        </Navbar>
    );

}