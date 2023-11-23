import React, { createContext, useContext } from 'react';
import { signal, type Signal } from '@preact/signals-react';

export interface TODO {
  text: string;
  completed: boolean;
}

type AppStateContextType = {
  todos: Signal<TODO[]>;
  addTodo: (newItem: Signal) => void;
  removeTodo: (index: number) => void;
  toggleTodo: (index: number) => void;
};

const AppStateContext = createContext<AppStateContextType | null>(null);

function AppStateProvider({ children }: { children: React.ReactNode }) {
  const todos = signal<TODO[]>([
    { text: 'Write my first post on DEV community', completed: true },
    { text: 'Explore more into Preact Signals feature', completed: false },
  ]);

  function addTodo(newItem: Signal) {
    todos.value = [...todos.value, { text: newItem.value, completed: false }];
  }

  function removeTodo(index: number) {
    todos.value.splice(index, 1);
    todos.value = [...todos.value];
  }

  function toggleTodo(index: number) {
    todos.value[index].completed = !todos.value[index].completed;
    todos.value = [...todos.value];
  }

  return (
    <AppStateContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>{children}</AppStateContext.Provider>
  );
}

function useAppState() {
  const appState = useContext(AppStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return appState;
}

export { AppStateProvider, useAppState };
