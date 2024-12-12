import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieGrid from "./pages/Movies";
import TVSeriesDetails from "./components/Movie/TvDetails";
import MovieDetails from "./components/Movie/MovieDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<MovieGrid />} />
              <Route path="/tv/:id" element={<TVSeriesDetails />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
