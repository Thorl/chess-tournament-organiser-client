import { Routes, Route } from "react-router-dom";

import { HomePage } from "./Pages/Home/HomePage";
import { LoginPage } from "./Pages/Login/LoginPage";
import { SignupPage } from "./Pages/Signup/SignupPage";
import { ProfilePage } from "./Pages/Profile/ProfilePage";
import { TournamentsPage } from "./Pages/Tournaments/TournamentsPage";
import { ClassesPage } from "./Pages/Classes/ClassesPage";
import { AccountDetailsPage } from "./Pages/AccountDetails/AccountDetailsPage";
import { TournamentDetailsPage } from "./Pages/TournamentDetails/TournamentDetailsPage";
import { NewTournamentPage } from "./Pages/NewTournament/NewTournamentPage";
import { ClassDetailsPage } from "./Pages/ClassDetails/ClassDetailsPage";
import { NewClassPage } from "./Pages/NewClass/NewClassPage";
import { NavLayout } from "./Components/NavLayout/NavLayout";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/account-details"
            element={<AccountDetailsPage />}
          />
          <Route path="/profile/tournaments" element={<TournamentsPage />} />
          <Route
            path="/profile/tournaments/:tournamentId"
            element={<TournamentDetailsPage />}
          />
          <Route
            path="/profile/tournaments/new-tournament"
            element={<NewTournamentPage />}
          />
          <Route path="/profile/classes" element={<ClassesPage />} />
          <Route
            path="/profile/classes/:classId"
            element={<ClassDetailsPage />}
          />
          <Route path="/profile/classes/new-class" element={<NewClassPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
