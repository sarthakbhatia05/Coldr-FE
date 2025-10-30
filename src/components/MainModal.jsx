import React from 'react';

const MainModal = ({ children }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      {children}
    </div>
  </div>
);

export default MainModal;
