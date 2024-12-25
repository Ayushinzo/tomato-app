import React, { useEffect, useState } from 'react'
import './ProductLists.css'
import { memo } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoAddOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'

function ProductLists({ fetchFood, fetchList, deleteFood }) {

    useEffect(() => {
        fetchFood()
    }, [])

    return (
        <div className="product-lists">
            <div className='sub-product-list'>
                <div className="heading">
                    <p>Sr. no</p>
                    <p>Name</p>
                    <p>Image</p>
                    <p>Category</p>
                    <p>Price (₹)</p>
                    <p>Delete</p>
                </div>
                {
                    fetchList.length == 0 ? <div className="no-food">
                        <Link exact="true" to='/item/add'><p><IoAddOutline className='add-icon' /><span>ADD A FOOD</span></p></Link>
                    </div> :
                        fetchList.map((item, index) => (
                            <div key={index} className="heading pro">
                                <p>{index + 1}</p>
                                <p>{item.name}</p>
                                <img src={`http://localhost:4000/tmp/${item.filename}`} alt="" />
                                <p>{item.category}</p>
                                <p>{item.price}</p>
                                <p><RiDeleteBin6Line onClick={() => deleteFood(item._id, item.name)} className='delete-icon' /></p>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default memo(ProductLists)