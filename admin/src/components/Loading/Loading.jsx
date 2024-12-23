import React from 'react'
import './Loading.css'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
    return (
        <div className='loader-container'>
            <div className="recipient-details skeleton">
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
            </div>
            <div className="recipient-details skeleton">
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
            </div>
            <div className="recipient-details skeleton">
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
            </div>
            <div className="recipient-details skeleton">
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
                <p><Skeleton duration={.7} /></p>
            </div>
        </div>
    )
}

export default Loading