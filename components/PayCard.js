import React from 'react'
import SendGift from './SendGift'

function PayCard() {
  return (
    <div>
     <div className="flex justify-center">
    <div className="w-full md:w-1/3 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="amount">
        Amount
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="amount" type="number" placeholder="0.00"/>
    </div>
    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="payment">
        Payment
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="payment">
          <option>SOL</option>
          <option>ETH</option>
          <option>USD</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
  </div>
  <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
        Message
      </label>
      <input className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="message" type="text" placeholder="message"/>
    </div>
 <SendGift/>
</div>
  )
}

export default PayCard