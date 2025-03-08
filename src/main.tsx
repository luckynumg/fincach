import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/fincach">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)