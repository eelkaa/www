import React, { useState } from 'react';

const PropertyForm = ({ onSave, onCancel, propertyName }) => {
  const [name, setName] = useState(propertyName || '');

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:7073/api/Tproperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: name }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения свойства');
      }

      const savedProperty = await response.json();
      onSave(savedProperty.name);
    } catch (error) {
      console.error('Ошибка при сохранении свойства:', error);
    }
  };

  return (
    <div>
      <label>Наименование свойства:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default PropertyForm;
