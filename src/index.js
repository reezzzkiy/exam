import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from './store/userStore';
import PostStore from './store/postStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Context.Provider value={{
    user: new UserStore(),
    post: new PostStore()
  }}>
     <App />
  </Context.Provider>
   
);


