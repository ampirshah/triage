import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import style from './App.module.scss';
import Doctor from "./pages/Doctor/Doctor";
import Triage from "./pages/Triage/Triage";

function App() {
  return (
    <div className={style.App}>
      <Routes>
        <Route path='/' element={<Navigate replace to="/Triage" />} />
        <Route path='/Triage' element={<Triage />} />
        <Route path='/Doctor' element={<Doctor />} />
        
        {/* <Route path='/' element={<Navigate to='/Triage/' />} /> */}
        {/* <Route path="/" element={<Triage />} />
        <Route path="/:id" element={<About />} /> */}
      </Routes>

      {/* <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="teams" element={<Teams />}>
            <Route path=":teamId" element={<Team />} />
            <Route path="new" element={<NewTeamForm />} />
            <Route index element={<LeagueStandings />} />
          </Route>
        </Route>
      </Routes> */}

    </div>
  );
}
// for more https://reactrouter.com/docs/en/v6/getting-started/tutorial 

// function Home() {
//   return (
//     <>
//       <main>
//         <h2>Welcome to the homepage!</h2>
//         <p>You can do this, I believe in you.</p>
//       </main>
//       <nav>
//         <Link to="/about">About</Link>
//       </nav>
//     </>
//   );
// }

// function About() {
//   return (
//     <>
//       <main>
//         <h2>Who are we?</h2>
//         <p>
//           That feels like an existential question, don't you
//           think?
//         </p>
//       </main>
//       <nav>
//         <Link to="/">Home</Link>
//       </nav>
//     </>
//   );
// }

export default App;
