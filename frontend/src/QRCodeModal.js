import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';

const QRCodeModal = ({ isOpen, onRequestClose, productId, color }) => {
  return (
    <Modal
  isOpen={isOpen}
  onRequestClose={onRequestClose}
  className="fixed inset-0 flex items-center justify-center p-4"
  overlayClassName="fixed inset-0 bg-white bg-opacity-75"
>
  <div className="bg-white border-2 border-teal-600 rounded-lg
   shadow-xl p-3 flex flex-col items-center justify-center">
    <div className='self-end'>
      <button 
          onClick={onRequestClose} 
          className="mb-2 px-2 py-1 border border-teal-600 text-teal-600 hover:bg-teal-700 
          hover:text-white transition-colors rounded"
        >
          X
      </button>
    </div>
    <div>
        {productId && <QRCode value={productId} fgColor={color} />}
    </div>
    
  </div>
</Modal>

  );
};

export default QRCodeModal;
