import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { TrackerContextProvider } from './context/context.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <TrackerContextProvider>
    <App />
    </TrackerContextProvider>
)
