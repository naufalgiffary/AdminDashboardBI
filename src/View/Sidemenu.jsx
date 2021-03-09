import React from 'react';
import './style.css'
import { Link } from 'react-router-dom'
import Blanjaimport from '../assets/Logo/Blanjaimport.png'

const Sidemenu = () => {

    return (
        <div className='sidemenu hidden'>
            <div className="menusection">
                <div className="menulogo">
                    <img width='100%' height='100%' src={Blanjaimport} alt="logo" />
                </div>
                <div className="allmenu">
                    <Link to='/' style={{textDecoration: 'none', color: 'black'}}>
                        <div className="listmenu">
                            <div className='thumbnail'>
                                <span><i className="fas fa-home"></i></span>
                            </div>
                            <div>
                                <h5>Resi</h5>
                            </div>
                        </div>
                    </Link>
                    <Link to='/user' style={{textDecoration: 'none', color: 'black'}}>
                        <div className="listmenu">
                            <div className='thumbnail'>
                                <span><i className="fas fa-users"></i></span>
                            </div>
                            <div style={{ marginLeft: '-1px' }}>
                                <h5>User</h5>
                            </div>
                        </div>
                    </Link>
                    {/* <div className="listmenu">
                        <div className='thumbnail'>
                            <span style={{paddingLeft: '2px'}}><i className="far fa-calendar-alt"></i></span>
                        </div>
                        <div style={{marginLeft: '3px'}}>
                            <h5>Daily Attendance</h5>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Sidemenu;