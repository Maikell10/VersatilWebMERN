import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'

export default class CreateUser extends Component {

    state = {
        users: [],
        name: '',
        username: '',
        email: '',
        password: ''
    }

   api = {
       getUsers: 'http://localhost:3000/users',
       createUsers: 'http://localhost:3000/users/register',
       deleteUser: 'http://localhost:3000/users/' + localStorage.getItem('usertoken') + '/'
   }

    async componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const res = await axios.post(this.api.getUsers, {
            token: localStorage.getItem('usertoken')
        })
        this.setState({ users: res.data })
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault()
        const res = await axios.post(this.api.createUsers, {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        })
        this.getUsers()
        this.setState({
            name: '',
            username: '',
            email: '',
            password: ''
        })
        console.log(res.data.status)
    }

    deleteUser = async (id) => {
        const response = window.confirm('are you sure you want to delete it?');
        if (response) {
            const res = await axios.delete('http://localhost:3000/users/' + id, {
                data:{
                    token: localStorage.getItem('usertoken')
                }
            });
            this.getUsers();
            console.log(res.data)
        }
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
            <div className="row mt-5">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-header">
                            <h3>Create New User</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        placeholder="Name"
                                        onChange={this.onChangeName}required />
                                </div>
                                <div className="form-group">
                                    <input type="text"
                                        className="form-control"
                                        value={this.state.username}
                                        placeholder="Username"
                                        onChange={this.onChangeUserName}
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="email"
                                        className="form-control"
                                        value={this.state.email}
                                        placeholder="Email"
                                        onChange={this.onChangeEmail} 
                                        required />
                                </div>
                                <div className="form-group">
                                    <input type="password"
                                        className="form-control"
                                        value={this.state.password}
                                        placeholder="password"
                                        onChange={this.onChangePassword} />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Save
                        </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-action h6 bg-dark text-white" key='0'>USERNAME</li>
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" key={user.id_usuario} onDoubleClick={() => this.deleteUser(user.id_usuario)}>
                                    {user.seudonimo}
                                </li>)
                            )
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
