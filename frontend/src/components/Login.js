import React, { Component } from 'react'
import axios from 'axios'
import { Redirect, Link } from 'react-router-dom'

export default class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    api = {
        login: 'http://localhost:3000/users/login'
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        await axios.post(this.api.login, user)
            .then(res => {
                localStorage.setItem('usertoken', res.data.token)
                localStorage.setItem('userId', res.data.userId)
                
                //return res.data.token
                this.props.history.push('/home')
            })
            .catch(err => {
                console.log(err.response.data)
            })

        //console.log(res)
    }

    render() {

        const alertRedirect = (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{localStorage.getItem('redirect')}</strong>
            </div>
        )

        const alertSuccess = (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>Usuario registrado satisfactoriamente</strong>
            </div>
        )

        if (localStorage.usertoken) {
            localStorage.setItem('redirect', 'You already logged')
            return (
                <Redirect to="/users" />
            )
        }

        return (
            <div className="row mt-5">
                    <div className="col-md-8 mx-auto">
                        {localStorage.redirect ? alertRedirect : null}
                        {localStorage.removeItem('redirect')}
                        {localStorage.mensaje ? alertSuccess : null}
                        {localStorage.removeItem('mensaje')}
                        <div className="card">
                            <div className="card-header">
                                <h2 className="card-title text-center font-weight-bold">Ingrese al Sistema de Versatil Seguros</h2>
                            </div>

                            <div className="card-body">
                                <div className="row">

                                    <div className="col-md-8 mx-auto ">

                                        <form onSubmit={this.onSubmit}>
                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-user fa-2x cyan-text pr-3"></i>
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="Usuario..." 
                                                    name="username" 
                                                    value={this.state.username}
                                                    onChange={this.onChange}
                                                    required />
                                                </div>
                                            </div>

                                            <div className="md-form">
                                                <div className="input-group">
                                                    <i className="fas fa-lock fa-2x cyan-text pr-3"></i>
                                                    <input type="password"
                                                    placeholder="Password..." 
                                                    className="form-control" 
                                                    name="password" 
                                                    value={this.state.password}
                                                    onChange={this.onChange}
                                                    required />
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <button type="submit" className="btn btn-info btn-block my-4  rounded-pill">Login</button>
                                            </div>
                                        </form>
                                        <h5 className="text-center">No tienes una cuenta? <Link to="/register" className="text-danger font-weight-bold">Registrate</Link></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                </div>
        )
    }
}
