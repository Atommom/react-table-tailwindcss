import { useState } from 'react';
import Portal from '../Portal';

const AddressModal = ({ onCancel, onSubmit, data }) => {
  const [isFreeform, toggleFreeform] = useState(false);
  const [address, setAddress] = useState(data || {});

  return (
    <>
      <div onClick={onCancel} className="fixed inset-0 bg-black opacity-50" />
      <Portal>
        <form onSubmit={e => onSubmit(e, address)} className="bg-white rounded-lg w-96 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <div className="px-4 py-2 border-b bg-gray-100 rounded-t-lg flex items-center justify-between">
            To Address
            <button onClick={onCancel} type="button">-</button>
          </div>
          <div className="px-4 py-2">
            <div className="text-right">
              <button className="text-blue-500 text-sm font-semibold" type="button" onClick={() => toggleFreeform(!isFreeform)}>
                {isFreeform ? 'Switch to Fields' : 'Switch To Freeform'}
              </button>
            </div>
            {!isFreeform && (
              <div className="flex flex-col">
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Name
                  </span>
                  <input type="text" name="name" value={address.name} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, name: e.target.value })} required />
                </label>
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Address
                  </span>
                  <input type="text" name="address1" value={address.address1} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, address1: e.target.value })} required />
                </label>
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Address 2
                    <span className="text-xs text-gray-400 ml-1">(optional)</span>
                  </span>
                  <input type="text" name="address2" value={address.address2} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, address2: e.target.value })} />
                </label>
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    City
                  </span>
                  <input type="text" name="city" value={address.city} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, city: e.target.value })} required />
                </label>
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    State
                  </span>
                  <input type="text" name="state" value={address.state} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, state: e.target.value })} required />
                </label>
                <label className="block mt-2">
                  <span className="block text-sm font-medium text-gray-700">
                    Zip
                  </span>
                  <input type="text" name="zip" value={address.zip} className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" onChange={e => setAddress({ ...address, zip: e.target.value })} required />
                </label>
              </div>
            )}
            {isFreeform && (
              <label className="block mt-2">
                <span className="block text-sm font-medium text-gray-700">
                  Address (free-form)
                  <span className="block text-xs text-gray-400">Copy & paste the full address</span>
                </span>
                <textarea name="fullAddress" className="mt-1 px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 h-24" required />
              </label>
            )}
          </div>
          <div className="text-center md:text-right mt-4 px-4 py-2 md:flex md:justify-end">
            <button className="block w-full px-4 py-2 bg-blue-700 text-white rounded-lg text-sm" type="submit">
              Save Address
            </button>
          </div>
        </form>
      </Portal>
    </>
  );
};

export default AddressModal;
