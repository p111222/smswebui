import React from 'react'

const CorporateBanner = ({customerId, customerName,clientCode}) => {
  return (
    <div className="w-full z-[999] shadow-lg bg-white py-3 px-[25px]">
    <div className="flex items-center justify-between">
      <div className="flex gap-10">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold">Customer Id :</span>
              {customerId}
            </div>
            <div>
              <span className="font-semibold">Customer Name :</span>
              {customerName}
            </div>
            <div>
              <span className="font-semibold">Client Code :</span>
              {clientCode}
            </div>
          </div>
      </div>
    </div>
  </div>
  )
}

export default CorporateBanner