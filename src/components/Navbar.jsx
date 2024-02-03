import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Cart from '../screens/Cart'
import Modal from '../Modal'
import { useCart } from './ContectReducer'


export default function Navbar() {

    const [cartView, setCartView]=useState(false)
    let data=useCart();
    const navigate=useNavigate()

    const handleLogout=()=>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                <div className="container-fluid ">
                    <Link className="navbar-brand fs-1 fst-italic"  to="/" style={{color:'red'}}>Zomato</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav me-auto mb-2">
                            <li>
                                <Link className="nav-link active fs-6" aria-current="page" to="/" style={{color:'black'}}>Home</Link>
                            </li>
                            {(localStorage.getItem("authToken"))?
                                <li>
                                    <Link className="nav-link active fs-6" aria-current="page" to="/myOrder" style={{color:'black'}}>My Orders</Link>
                                </li>
                            : "" }
                        </ul>
                        {(!localStorage.getItem("authToken"))?
                        <div className='d-flex'>
                            <Link className='btn bg-white mx-1' to='/login' style={{color:'black'}}>Login</Link>
                            <Link className='btn bg-white mx-1' to='/createuser' style={{color:'black'}}>SignUp</Link>
                        </div>
                        : 
                        <div>
                        <div className='btn bg-white text-danger mx-2' onClick={()=>{setCartView(true)}} >
                            My Cart {" "}
                            <Badge pill bg="danger">{data.length}</Badge>
                        </div>

                        {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal>:null}

                        <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
                            Logout
                        </div>
                        </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
