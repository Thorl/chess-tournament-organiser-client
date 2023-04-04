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
import { PrivateRoutes } from "./Components/PrivateRoutes/PrivateRoutes";
import { AnonRoutes } from "./Components/AnonRoutes/AnonRoutes";

import styles from "./App.module.css";
import { ErrorPage } from "./Pages/ErrorPage/ErrorPage";

function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route element={<NavLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<AnonRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/account-details" element={<AccountDetailsPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route
              path="/tournaments/:tournamentId"
              element={<TournamentDetailsPage />}
            />
            <Route
              path="/tournaments/new-tournament"
              element={<NewTournamentPage />}
            />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:classId" element={<ClassDetailsPage />} />
            <Route path="/classes/new-class" element={<NewClassPage />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
