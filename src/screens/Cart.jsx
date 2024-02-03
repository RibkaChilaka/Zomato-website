import React from 'react'
import {useCart, useDispatch} from '../components/ContectReducer'
import trash from '../image/trash.png'
export default function Cart() {
    let data=useCart();
    let dispatch=useDispatch()
    if (data.length===0){
        return(
            <div>
                <div className='m-5 w-100 text-center fs-3' style={{color:'white'}}>The cart is Empty!</div>
            </div>
        )
    }
    const handleCheckOut=async()=>{
        let userEmail=localStorage.getItem("userEmail")
        let response=await fetch("http://localhost:5000/api/orderData",{
            method:"POST",
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date: new Date().toDateString()
            })
        }
        )
        console.log("Order Response:", response)
        if(response.status===200){
            dispatch({type:"DROP"})
        }
    }
    let totalPrice=data.reduce((total, food)=>total+food.price, 0)
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-danger fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td ><button type="button" className="btn p-0" onClick={()=>{
                                    dispatch({type: "REMOVE", index: index})
                                }}>
                                    <img className='img1' src={trash} alt="delete" style={{width:"15px", height:"15px"}}/>
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-danger mt-5 ' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>
        </div>
    )
}