import * as React from 'react'
import Layout from './Layout'

const App: React.FC = () => {
    return <Layout />
}

export default App

/**
 * Flow:
 * Create a 2-D board.
 * Create few buttons for setup, next iteration.
 * Before setup, provide option to user to setup everything.
 *
 * Setup options: which algorithm to choose when dissatisfied for the agent.
 *
 * Components:
 * - Board :: Contains each dot.
 * - Buttons :: Contains the buttons in the page.
 * - Popup for choosing setup configuration.
 *
 */
