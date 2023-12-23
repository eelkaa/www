import React, { useState, useEffect } from 'react';
import GroupForm from './GroupForm';
import PropertyForm from './PropertyForm';
import fetchData from '../api';  // Импортируем нашу функцию загрузки данных

const TreeView = () => {
  const [editingNode, setEditingNode] = useState(null);
  const [treeData, setTreeData] = useState(null);

  useEffect(() => {
    const loadTreeData = async () => {
      try {
        const data = await fetchData('tree'); // 'tree' - замените на ваш endpoint
        setTreeData(data);
      } catch (error) {
        console.error('Ошибка при загрузке дерева:', error);
      }
    };

    loadTreeData();
  }, []);

  const handleEdit = (node) => {
    setEditingNode(node);
  };

  const handleSave = async (formData) => {
    try {
      const response = await fetch(`${apiUrl}/${formData.type}/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Name: formData.text }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка при обновлении ${formData.type}`);
      }

      // После сохранения данных сбрасываем состояние редактирования
      setEditingNode(null);
      // Перезагружаем данные для обновления дерева
      loadTreeData();
    } catch (error) {
      console.error('Ошибка при сохранении данных:', error);
    }
  };

  const handleCancel = () => {
    // Отмена редактирования
    setEditingNode(null);
  };

  // Функция рекурсивного рендеринга узлов дерева
  const renderTreeNodes = (nodes) => {
    return nodes.map((node) => (
      <div key={node.id}>
        {node.text} ({node.type})
        <button onClick={() => handleEdit(node)}>Редактировать</button>
        {node.children && node.children.length > 0 && renderTreeNodes(node.children)}
      </div>
    ));
  };

  return (
    <div>
      {/* Рендеринг вашего дерева */}
      {treeData && renderTreeNodes([treeData])}

      {/* Формы редактирования */}
      {editingNode && editingNode.type === 'group' && (
        <GroupForm onSave={handleSave} onCancel={handleCancel} groupName={editingNode.text} />
      )}
      {editingNode && editingNode.type === 'property' && (
        <PropertyForm onSave={handleSave} onCancel={handleCancel} propertyName={editingNode.text} />
      )}
    </div>
  );
};

export default TreeView;