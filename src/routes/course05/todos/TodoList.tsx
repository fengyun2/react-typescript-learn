import React, { useState } from 'react';
import { Checkbox, Input, Button, Space, Typography, Flex, List } from 'antd';
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

  // const renderTodos = () => {
  //   return (
  //     <ul style={{ textAlign: 'left' }}>
  //       {todos.map((todo, index) => {
  //         return (
  //           <li key={index}>
  //             <Space style={{ display: 'flex', alignItems: 'center' }}>
  //               <Checkbox checked={todo.completed} onChange={() => toggleTodo(index)}>
  //                 <Text type={todo.completed ? 'secondary' : undefined} delete={todo.completed}>
  //                   {todo.text}
  //                 </Text>
  //               </Checkbox>
  //               <Button
  //                 size='small'
  //                 type='link'
  //                 danger
  //                 onClick={() => {
  //                   removeTodo(index);
  //                 }}
  //               >
  //                 x
  //               </Button>
  //             </Space>
  //           </li>
  //         );
  //       })}
  //     </ul>
  //   );
  // };

  const renderTodos = () => {
    return (
      <List
        bordered
        itemLayout='horizontal'
        dataSource={todos}
        renderItem={(todo, index) => (
          <List.Item>
            <Space style={{ display: 'flex', alignItems: 'center' }}>
              {<Text style={{ width: '100%' }}>{index + 1}.</Text>}
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
          </List.Item>
        )}
      ></List>
    );
  };

  return (
    <Flex justify='center' align='center' vertical>
      <Space direction='vertical' align='center'>
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <Input value={newItem} onChange={onTodoChange} onPressEnter={onAddTodo} />
          <Button type='primary' disabled={!newItem} onClick={onAddTodo}>
            Add
          </Button>
        </Space>
        <div>{renderTodos()}</div>
      </Space>
    </Flex>
  );
}

export default TodoList;
