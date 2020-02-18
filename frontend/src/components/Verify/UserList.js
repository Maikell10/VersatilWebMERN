import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default class UserList extends Component {

    state = {
        users: []
    }

    async componentDidMount() {
        const res = await axios.post('http://localhost:3000/users', {
            token: localStorage.getItem('usertoken')
        })
        this.setState({ users: res.data })
        
    }

    render() {

        if (!localStorage.usertoken) {
            localStorage.setItem('redirect', 'Debes logearte primero')
            return (
                <Redirect to="/login" />
            )
        }

        if (localStorage.usertoken) {
            jwt.verify(localStorage.usertoken, 'secret', (err, decoded) => {
                if (err) {
                    //console.log('Token Expired')
                    localStorage.setItem('redirect', 'Sesión expirada')
                    return (
                        <Redirect to="/login" />
                    )
                }
            })
        }

        return (
            <div className="container">
                <div className="row p-5">
                    <div className="col-md-8 mx-auto">
                        <ul className="list-group">
                            {
                                this.state.users.map(user => (
                                    <li className="list-group-item list-group-item-action" key={user.id_usuario}>
                                        {user.seudonimo}
                                    </li>)
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
