import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/gen/Footer";
import Header from "./components/gen/Header";
import HomePage from "./pages/HomePage";
import TVSeriesDetails from "./pages/TvDetails";
import MovieDetails from "./pages/MovieDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signin from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MoviesList from "./pages/Genres";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tv/:id" element={<TVSeriesDetails />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/genres" element={<MoviesList />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
