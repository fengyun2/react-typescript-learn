import React, { createContext, useContext } from 'react';
import { create } from 'zustand';

export interface TODO {
  text: string;
  completed: boolean;
}

type AppStateContextType = {
  todos: TODO[];
  addTodo: (newItem: string) => void;
  removeTodo: (index: number) => void;
  toggleTodo: (index: number) => void;
};

const useStore = create<AppStateContextType>()((set) => ({
  todos: [
    { text: 'Write my first post on DEV community', completed: true },
    { text: 'Explore more into Preact Signals feature', completed: false },
  ],
  addTodo: (todo: string) => set((state) => ({ todos: [...state.todos, { text: todo, completed: false }] })),
  removeTodo: (index: number) => set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
  toggleTodo: (index: number) =>
    set((state) => ({
      todos: state.todos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo)),
    })),
}));

const AppStateContext = createContext<AppStateContextType | null>(null);

function AppStateProvider({ children }: { children: React.ReactNode }) {
  return <AppStateContext.Provider value={useStore()}>{children}</AppStateContext.Provider>;
}

function useAppState() {
  const appState = useContext(AppStateContext);
  if (!appState) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return appState;
}

export { AppStateProvider, useAppState };
