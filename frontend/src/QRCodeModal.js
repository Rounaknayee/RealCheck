import React from 'react';
import Modal from 'react-modal';
import QRCode from 'qrcode.react';

const QRCodeModal = ({ isOpen, onRequestClose, productId, color }) => {
  const handlePrint = () => {
    try{    const qrElement = document.getElementById('qrCodeElement');
    if (qrElement) {
      const canvas = qrElement.querySelector('canvas');
      if (canvas) {
        // Convert Canvas to Data URL
        const imageUrl = canvas.toDataURL('image/png');

        // Open a new print window with the QR code image
        const printWindow = window.open('', '_blank');
        printWindow.document.write('<html><head><title>Print QR</title></head><body>');
        printWindow.document.write(`<img src="${imageUrl}" style="display: block; margin: auto;"/>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        // printWindow.close();
      }
    }
  } catch (error) {
    console.error(error);
  }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-white bg-opacity-75"
    >
      <div className="bg-white border-2 border-teal-600 rounded-lg shadow-xl p-3 flex flex-col items-center justify-center">
        <div className='self-end'>
          <button 
              onClick={onRequestClose}
              title='Close'
              className="cursor-pointer mb-2 px-2 py-1 border border-teal-600 text-teal-600 hover:bg-teal-700 hover:text-white transition-colors rounded"
            >
              X
          </button>
        </div>
        <div id="qrCodeElement">
            {productId && <QRCode value={productId} fgColor={color} />}
        </div>
        <button 
          onClick={handlePrint} 
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 focus:outline-none focus:ring"
        >
          Print QR Code
        </button>
      </div>
    </Modal>
  );
};

export default QRCodeModal;