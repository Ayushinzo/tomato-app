import React, { memo } from 'react'
import './PromoInput.css'

function PromoInput({ handleChangePromo, handleCodeSubmit, promo }) {
    return (
        <div className="promo-code">
            <div className="generate-code">
                <h2>Generate Code</h2>
                <form action="" onSubmit={handleCodeSubmit} method="post">
                    <input type="text" name='codeName' onChange={handleChangePromo} placeholder='Code name' value={promo.codeName} required />
                    <input type="number" name='discount' onChange={handleChangePromo} placeholder='Discount' value={promo.discount} required />
                    <input type="number" name='maxUses' onChange={handleChangePromo} placeholder='Maximum uses' value={promo.maxUses} required />
                    <button type='submit'>Generate</button>
                </form>
            </div>
        </div>
    )
}

export default memo(PromoInput)
