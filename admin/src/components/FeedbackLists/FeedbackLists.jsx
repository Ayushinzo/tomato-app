import React, { useEffect } from 'react'
import './FeedbackLists.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading/Loading';

function FeedbackLists({ data, fetchMore, totalFeedback, deleteFeedback }) {
    function dis() {
        console.log(data.length)
    }
    return (
        <div className="feedback-lists" id='scrollableDiv'>
            <div className="scroll">
                <div className="feedback-heading">
                    <p onClick={dis}>Sr. no</p>
                    <p>RECIPIENT</p>
                    <p>DESCRIPTION</p>
                    <p>E-MAIL</p>
                    <p>DATE</p>
                    <p>DELETE</p>
                </div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMore}
                    hasMore={totalFeedback > data.length}
                    loader={<Loading />}
                    scrollableTarget="scrollableDiv"
                    endMessage={(data.length != 0 || !data == undefined) && <div className='no-more'>No more feedback</div>}
                >
                    {
                        data.length == 0 || data.length == undefined ? <div className='no-feedback'><p>No feedback available</p></div> :
                            data.map((item, index) => (
                                <div key={index} className="recipient-details">
                                    <p>{index + 1}</p>
                                    <p>{item.name}</p>
                                    <p>{item.description}</p>
                                    <p className='email'>{item.email}</p>
                                    <p>{new Date(`${item.createdAt}`).toLocaleDateString()}</p>
                                    <p className='delete-p'><RiDeleteBin6Line className='delete-icon' onClick={() => deleteFeedback(item._id, item.name)} /></p>
                                </div>
                            ))
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default memo(FeedbackLists)