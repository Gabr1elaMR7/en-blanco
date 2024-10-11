import React from 'react';

const AdminComponent = () => {
  return (
    <div>
      <h1>Área de Administración</h1>
      <p>Solo accesible para usuarios con rol 'super'.</p>
    </div>
  );
};

export default AdminComponent;
