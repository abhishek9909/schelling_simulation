import App from './App'
import * as React from 'react'
import { createRoot } from 'react-dom/client'

const element = document.getElementById('schelling-simulation-app')
if (element) {
    const root = createRoot(element)
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    )
}
