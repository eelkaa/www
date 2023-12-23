import React, { useState } from 'react';

const GroupForm = ({ onSave, onCancel, groupName }) => {
  const [name, setName] = useState(groupName || '');

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:7073/api/Tgroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: name }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сохранения группы');
      }

      const savedGroup = await response.json();
      onSave(savedGroup.name);
    } catch (error) {
      console.error('Ошибка при сохранении группы:', error);
    }
  };

  return (
    <div>
      <label>Наименование группы:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default GroupForm;
