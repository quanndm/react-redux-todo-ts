import React from 'react';
import { Provider } from 'react-redux'
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="todoapp">
        <Header/>
        <TodoList />
        <Footer />
      </div>
    </Provider>

  );
}

export default App;
