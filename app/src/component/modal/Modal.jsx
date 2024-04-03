import React, { useState } from "react";

const Modal = () => {
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
              <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                <label htmlFor="firstName" className="block text-black text-sm font-bold mb-1">
                  First Name
                </label>
                <input id="firstName" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                <label htmlFor="lastName" className="block text-black text-sm font-bold mb-1">
                  Last Name
                </label>
                <input id="lastName" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                <label htmlFor="address" className="block text-black text-sm font-bold mb-1">
                  Address
                </label>
                <input id="address" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                <label htmlFor="city" className="block text-black text-sm font-bold mb-1">
                  City
                </label>
                <input id="city" className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
              </form>
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






















