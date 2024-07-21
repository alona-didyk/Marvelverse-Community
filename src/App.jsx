import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { EntryPage } from "./pages/EntryPage";
import { Chat } from "./pages/Chat";
import { Comic } from "./pages/Comic";
import { Login } from "./pages/Login";
import { Movie } from "./pages/Movie";
import { MoviesDetails } from "./components/Movie/Details/Details";
import { ComicsDetails } from "./components/Comic/Details/ComicsDetails";
import { Regist } from "./pages/Regist";
import { User } from "./pages/User";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Header hideEntryPage></Header>

          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            <Route path="/movie" element={<Movie />} />
            <Route path="/details/:id" element={<MoviesDetails />} />
            <Route path="/comic" element={<Comic />} />
            <Route path="/comicsdetails/:id" element={<ComicsDetails />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/user" element={<User />} />
          </Routes>

          <Footer></Footer>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
