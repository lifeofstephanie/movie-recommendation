import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MovieGrid from "./pages/Movies";
import TVSeriesDetails from "./components/Movie/TvDetails";
import MovieDetails from "./components/Movie/MovieDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2, // Retry failed queries twice
        staleTime: 5 * 60 * 1000, // 5 minutes before data is considered stale
        cacheTime: 10 * 60 * 1000, // Cache unused data for 10 minutes
      },
    },
  });

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
              {/* Fallback Route */}
              <Route path="*" element={<div>404 - Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
