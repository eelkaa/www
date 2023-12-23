import React from 'react';
import ReactDOM from 'react-dom';
import TreeView from '../src/components/TreeView';

const App = () => {
  return (
    <div>
      <h1>Студенты</h1>
      <TreeView />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
