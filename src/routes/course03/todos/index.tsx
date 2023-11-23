import { Flex } from 'antd';
import TodoList from './Todolist';
import { AppStateProvider } from './AppStateContext';

const App = () => {
  return (
    <Flex justify='center' align='center' vertical style={{ width: '100%' }}>
      <h1>Signal</h1>
      <h2>npm install @preact/signals-react</h2>
      <AppStateProvider>
        <TodoList />
      </AppStateProvider>
    </Flex>
  );
};

export default App;
