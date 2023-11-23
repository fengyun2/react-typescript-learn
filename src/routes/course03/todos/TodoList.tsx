import React from 'react';
import { Checkbox, Input, Button, Space, Typography, Flex } from 'antd';
import { signal } from '@preact/signals-react';
import { useAppState } from './AppStateContext';

const { Text } = Typography;

const newItem = signal('');

function TodoList() {
  const { todos, addTodo, removeTodo, toggleTodo } = useAppState();

  const onTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    newItem.value = event.target.value;
  };

  const onAddTodo = () => {
    addTodo(newItem);
    newItem.value = '';
  };

  const renderTodos = () => {
    return (
      <ul style={{ textAlign: 'left' }}>
        {todos.value.map((todo, index) => {
          return (
            <li key={index}>
              <Space style={{ display: 'flex', alignItems: 'center' }}>
                <Text strong={todo.completed}>{todo.text}</Text>
                <Checkbox checked={todo.completed} onChange={() => toggleTodo(index)} />
                <Button
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
      <h2>Todos</h2>
      <Space style={{ display: 'flex', alignItems: 'center' }}>
        <Input value={newItem.value} onChange={onTodoChange} />
        <Button onClick={onAddTodo}>Add</Button>
      </Space>
      <div>{renderTodos()}</div>
    </Flex>
  );
}

export default TodoList;
