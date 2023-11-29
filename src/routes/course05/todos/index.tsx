// zustand 版todos

import { Flex } from 'antd';
import TodoList from './TodoList';
import { AppStateProvider } from './store';

const App = () => {
  return (
    <Flex justify='center' align='center' vertical style={{ width: '100%' }}>
      <h1>zustand todos</h1>
      <AppStateProvider>
        <TodoList />
      </AppStateProvider>
    </Flex>
  );
};

export default App;
