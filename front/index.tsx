import React from 'react'
import ReactDOM from 'react-dom/client'
import LoanForm from './components/LoanForm'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <LoanForm />
    </React.StrictMode>
)
