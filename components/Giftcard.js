import React from 'react'
import Tweet from './Tweet'
import RecieverCard from './ReceiverCard'
import PayCard from './PayCard'

function Giftcard() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg py-2">
           <RecieverCard/>
            <Tweet/>
            <div>
            <PayCard/>
            </div>
  </div>
  )
}

export default Giftcard