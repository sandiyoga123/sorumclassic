import React from "react";

const OrderDetailView = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Order Information Section */}
      <div>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b">Order Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Order Date</label>
              <input type="text" disabled value={new Date(data.order_date).toLocaleString()} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Total Price</label>
              <input type="text" disabled value={`Rp ${data.total_price.toLocaleString()}`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <input type="text" disabled value={data.status} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Recipient Name</label>
              <input type="text" disabled value={data.order_detail.name} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
              <input type="text" disabled value={data.order_detail.phone} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
              <input type="text" disabled value={`${data.order_detail.address} (${data.order_detail.postal_code})`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Expedition</label>
              <input type="text" disabled value={`${data.order_detail.expedition} (Rp ${data.order_detail.expedition_fee.toLocaleString()})`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-4">
          {data.payment_proof && (
            <a href={data.payment_proof} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              View Payment Proof
            </a>
          )}
          {data.receipt && (
            <a href={data.receipt} target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              View Receipt
            </a>
          )}
        </div>
      </div>

      {/* User & Review Section */}
      <div>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b">User & Review Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
              <input type="text" disabled value={data.user.username} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">User Phone</label>
              <input type="text" disabled value={data.user.phone} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
          </div>
          {data.review && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                <input type="text" disabled value={`${data.review.rating}/5`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Review</label>
                <textarea disabled value={data.review.review} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" rows={2} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Unit Information Section */}
      <div>
        <h2 className="text-lg font-medium mb-4 pb-2 border-b">Unit Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Brand & Name</label>
              <input type="text" disabled value={`${data.item.unit.brand} - ${data.item.unit.name}`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Type & Year</label>
              <input type="text" disabled value={`${data.item.unit.type} (${data.item.unit.year})`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Price</label>
              <input type="text" disabled value={`Rp ${data.item.unit.price.toLocaleString()}`} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Quantity</label>
              <input type="text" disabled value={data.item.quantity} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md" />
            </div>
          </div>
          <div>
            <img src={data.item.unit.image} alt={data.item.unit.name} className="w-full h-64 object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailView;
