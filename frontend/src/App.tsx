// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"
import Register from "./pages/Register"
import Layout from "./layouts/Layout"
import SignIn from "./pages/SignIn"

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={
            <Layout>
              <span>
                <p>Home Page</p>
              </span>
            </Layout>} />
          <Route path="/search" element={
            <Layout>
              <h2>Search Page</h2>
            </Layout>
          } />
          <Route path="/register" element={
            <Layout>
              <Register />
            </Layout>}
          />
          <Route path="/sign-in" element={
            <Layout>
              <SignIn />
            </Layout>}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>


      </Router>
    </>
  )
}

export default App;