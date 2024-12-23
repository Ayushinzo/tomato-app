import React, { useContext } from 'react'
import './PromoList.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';
import { memo } from 'react';
import { Context } from '../../Context/Context';

function PromoList({ promoList, fetchPromos }) {
    const { url } = useContext(Context)
    async function deletePromo(promoId, promoName) {
        let del = confirm(`Do you really want to delete ${promoName}?`)
        if (del) {
            try {
                let response = await axios.post(`${url}/api/promo/delete-promo`, {
                    id: promoId
                })

                if (response.data.success) {
                    toast.success("Promo deleted successfully")
                    fetchPromos()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            {
                promoList.length == undefined || promoList.length == 0 ? <div className='no-promo'><p>No Promo available</p></div> :
                    promoList.map((item, index) => (
                        <>
                            <div key={index} className="nested">
                                <p>{index + 1}</p>
                                <p>{item.codeName}</p>
                                <p>{item.discount}</p>
                                <p>{item.maxUses}</p>
                                <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                                <p><RiDeleteBin6Line onClick={() => deletePromo(item._id, item.codeName)} className='promo-delete' /></p>
                            </div>
                            <hr className='hr' />
                        </>
                    ))
            }
        </>
    )
}

export default memo(PromoList)
