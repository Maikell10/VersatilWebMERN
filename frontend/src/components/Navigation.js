import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navigation extends Component {

    logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }

    render() {

        const loginRegLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Registrate
                    </Link>
                </li>
            </ul>

        )

        const userLink = (
            <ul className="navbar-nav ml-auto">

                <li className="dropdown nav-item">
                    <Link to="/" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i className="fas fa-plus pr-1"></i>
                        Cargar Datos
                        </Link>
                    <div className="dropdown-menu">
                        <Link to="add/crear_poliza.php" className="dropdown-item">
                            <i className="fas fa-plus-square pr-2 cyan-text"></i> Póliza
                            </Link>
                        <Link to="add/crear_comision.php" className="dropdown-item">
                            <i className="fas fa-plus-square pr-2 cyan-text"></i> Comisión
                            </Link>
                        <Link to="add/crear_asesor.php" className="dropdown-item">
                            <i className="fas fa-user-plus pr-2 cyan-text"></i> Asesor
                            </Link>
                        <Link to="add/crear_compania.php" className="dropdown-item">
                            <i className="fas fa-briefcase pr-2 cyan-text"></i> Compañía
                            </Link>
                        <Link to="add/crear_usuario.php" className="dropdown-item">
                            <i className="fas fa-user-plus pr-2 cyan-text"></i> Usuario
                            </Link>
                    </div>
                </li>

                <li className="dropdown nav-item">
                    <Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i className="fas fa-search"></i> Buscar
                        </Link>
                    <div className="dropdown-menu dropdown-with-icons">
                        <Link to="b_asesor.php" className="dropdown-item">
                            <i className="fas fa-male pr-2 cyan-text"></i> Asesor
                            </Link>
                        <Link to="b_cliente.php" className="dropdown-item">
                            <i className="fas fa-male pr-2 cyan-text"></i> Cliente
                            </Link>
                        <Link to="b_poliza.php" className="dropdown-item">
                            <i className="far fa-clipboard pr-2 cyan-text"></i> Póliza
                            </Link>
                        <Link to="b_comp.php" className="dropdown-item">
                            <i className="fas fa-briefcase pr-2 cyan-text"></i> Compañía
                            </Link>
                        <Link to="b_reportes.php" className="dropdown-item">
                            <i className="fas fa-clipboard-list pr-2 cyan-text"></i> Reportes de Comision
                            </Link>
                        <Link to="b_reportes_cia.php" className="dropdown-item">
                            <i className="fas fa-clipboard-list pr-2 cyan-text"></i> Reportes de Comision por Cía
                            </Link>
                        <Link to="b_usuario.php" className="dropdown-item">
                            <i className="fas fa-user-tie pr-2 cyan-text"></i> Usuario
                            </Link>
                    </div>
                </li>

                <li className="dropdown nav-item">
                    <Link to="#" className="dropdown-toggle nav-link" data-toggle="dropdown">
                        <i className="fas fa-chart-line"></i> Gráficos
                        </Link>
                    <div className="dropdown-menu dropdown-with-icons">
                        <Link to="grafic/porcentaje.php" className="dropdown-item">
                            <i className="material-icons cyan-text">pie_chart</i> Porcentajes
                            </Link>
                        <Link to="grafic/primas_s.php" className="dropdown-item">
                            <i className="material-icons cyan-text">bar_chart</i> Primas Suscritas
                            </Link>
                        <Link to="grafic/primas_c.php" className="dropdown-item">
                            <i className="material-icons cyan-text">thumb_up</i> Primas Cobradas
                            </Link>
                        <Link to="grafic/comisiones_c.php" className="dropdown-item">
                            <i className="material-icons cyan-text">timeline</i> Comisiones Cobradas
                            </Link>
                        <Link to="#" className="dropdown-item">
                            <i className="material-icons cyan-text">show_chart</i> Gestión de Cobranza
                            </Link>
                    </div>
                </li>

                <li className="nav-item">
                    <Link to="/users" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/create" className="nav-link">
                        Create User
                    </Link>
                </li>

                <li className="nav-item avatar dropdown">
                    <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-55" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" to="">
                        <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg" className="rounded-circle z-depth-0" height="35" alt="avatar" />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-lg-right dropdown-primary"
                        aria-labelledby="navbarDropdownMenuLink-55">
                        <Link className="dropdown-item cyan-text" to="#"><i className="fas fa-user-cog pr-2"></i>Ver Perfil</Link>
                        <Link className="dropdown-item red-text" to="" onClick={this.logOut}><i className="fas fa-power-off pr-2"></i>Cerrar Sessión</Link>
                    </div>
                </li>
            </ul>
        )

        return (
            <div className="mb-5">
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark blue-gradient ">
                    <div className="container">
                        <Link className="navbar-brand" to="/home">
                            <img src={'logv.png'} width='110px' alt="logo" />
                        </Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="material-icons">sort</i>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            {localStorage.usertoken ? userLink : loginRegLink}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navigation)