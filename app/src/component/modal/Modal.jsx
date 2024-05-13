import React, { useState } from "react";

const Modal = ({ name, address, pincode, phoneNumber, setName, setAddress, setPincode, setPhoneNumber, buyNow }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="bg-black text-white active:bg-white font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Fill Details
      </button>
      {showModal ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50 transition-opacity">
          <div className="transition-transform w-full max-w-lg bg-white rounded-lg shadow-lg transform scale-100">
            <div className="flex items-start justify-between p-5 border-b border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">General Info</h3>
              <button className="text-black" onClick={() => setShowModal(false)}>
                x
              </button>
            </div>
            <div className="p-6">
            <form className="space-y-4 md:space-y-6" action="#">
          <div>
      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Name</label>
<input value={name} onChange={(e)=>setName(e.target.value)} type="name" name="name" id="name" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
</div>
<div>
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Enter Full Address</label>
<input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" name="address" id="address" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
</div>
<div>
<label htmlFor="pincode" className="block mb-2 text-sm font-medium text-gray-900">Enter Pincode</label>
<input value={pincode} onChange={(e)=>setPincode(e.target.value)} type="text" name="pincode" id="pincode" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
</div>
<div>
<label htmlFor="mobileNumber" className="block mb-2 text-sm font-medium text-gray-900">Enter Mobile Number</label>
<input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="text" name="mobileNumber" id="mobileNumber" className=" border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100" required />
</div>
</form>
<button onClick={()=>{buyNow(); closeModal()}} type="button" className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800  outline-0 font-medium rounded-lg text-sm px-5 py-2.5 ">Order Now</button>
</div>
<div className="flex items-center justify-end p-6 border-t border-gray-300 rounded-b">
<button
className="text-red-500 font-bold uppercase px-6 py-2 text-sm"
onClick={() => setShowModal(false)}
>
Close
</button>
<button
className="text-white bg-black  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg"
onClick={() => setShowModal(false)}
>
Submit
</button>
</div>
</div>
</div>
) : null}
    </>
  );
};

export default Modal;






















