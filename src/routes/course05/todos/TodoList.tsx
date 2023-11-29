import React, { useState } from 'react';
import { Checkbox, Input, Button, Space, Typography, Flex } from 'antd';
import { useAppState } from './store';

const { Text } = Typography;

function TodoList() {
  const [newItem, setNewItem] = useState('');
  const { todos, addTodo, removeTodo, toggleTodo } = useAppState();

  const onTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const onAddTodo = () => {
    addTodo(newItem);
    setNewItem('');
  };

  const renderTodos = () => {
    return (
      <ul style={{ textAlign: 'left' }}>
        {todos.map((todo, index) => {
          return (
            <li key={index}>
              <Space style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox checked={todo.completed} onChange={() => toggleTodo(index)}>
                  <Text type={todo.completed ? 'secondary' : undefined} delete={todo.completed}>
                    {todo.text}
                  </Text>
                </Checkbox>
                <Button
                  size='small'
                  type='link'
                  danger
                  onClick={() => {
                    removeTodo(index);
                  }}
                >
                  x
                </Button>
              </Space>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <Flex justify='center' align='center' vertical>
      <Space style={{ display: 'flex', alignItems: 'center' }}>
        <Input value={newItem} onChange={onTodoChange} />
        <Button type='primary' disabled={!newItem} onClick={onAddTodo}>
          Add
        </Button>
      </Space>
      <div>{renderTodos()}</div>
    </Flex>
  );
}

export default TodoList;
