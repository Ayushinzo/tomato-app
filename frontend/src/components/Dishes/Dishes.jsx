import React, { useContext } from 'react'
import './Dishes.css'
import Food from '../Food/Food';
import { Context } from '../../Context/Context'

function Dishes() {
    const { category, displayFoods } = useContext(Context)
    return (
        <div className='dishes'>
            <h2>Top dishes near you</h2>
            <div className="food-container">
                {
                    displayFoods.map((item, index) => {
                        if (category == "All" || category == item.category) {
                            return (
                                <>
                                    <Food
                                        id={item._id}
                                        index={index}
                                        name={item.name}
                                        image={item.filename}
                                        price={item.price}
                                        description={item.description}
                                        category={item.category}
                                    />
                                </>
                            )
                        }

                    })
                }
            </div>
        </div>
    )
}

export default Dishes;