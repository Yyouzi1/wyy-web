import React from 'react'

// 导入子组件
import Top from './components/Top'
import Content from './components/Content'
import store from './store'
import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <div id="app">
        <Top />
        <Content />
      </div>
    </Provider>
  )
}

export default App
