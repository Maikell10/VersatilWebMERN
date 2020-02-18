import React, { Component } from 'react'

class Footer extends Component {

    render() {

        const year = (new Date().getFullYear())

        return (
            <div className="align-items-end">
                <footer className="page-footer">
                    <div className="footer-copyright text-center py-3">{year}, Versatil Seguros S.A.
                        <a href="https://www.versatilseguros.com"> Versatil Panamá</a>
                    </div>
                </footer>
            </div>

        )
    }
}

export default Footer