import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { unregister } from './serviceWorker'
import '@elastic/eui/dist/eui_theme_light.min.css'

ReactDOM.render(<App/>, document.getElementById('root'))

unregister()
