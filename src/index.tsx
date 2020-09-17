import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { DndProvider } from "react-dnd"
import Backend from "react-dnd-html5-backend"
import { ThemeProvider, createGlobalStyle } from "styled-components"
import configStore from "./redux/configStore"
import Layout from "./containers/Layout"
import theme from "./theme"
import "normalize.css"
import "antd/dist/antd.css"
// import Test from './test'

export const store = configStore()
const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    font-family: Whitney,Microsoft JhengHei,微軟正黑體,Microsoft JhengHei UI,Microsoft YaHei,微軟雅黑,宋体,SimSun,Helvetica Neue,Helvetica,Arial,sans-serif;
    color: #000;
  }
  .ant-menu-item-selected.ant-menu-item-selected.ant-menu-item-selected, 
  .ant-menu-item-active.ant-menu-item-active.ant-menu-item-active {
    background-color: #4e5d94;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: lightgray;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 5px;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <Router>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout />
        </ThemeProvider>
      </Router>
    </DndProvider>
  </Provider>,
  document.getElementById("root")
)

// ReactDOM.render(
//   <Router>
//     <Test />
//   </Router>
//   ,
//   document.getElementById('root')
// )

export type AppDispatch = typeof store.dispatch
