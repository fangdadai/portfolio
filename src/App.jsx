import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="font-Poppins bg-ghostWhite">
      <Navbar />
      <Home />
      <Projects />
      <Blog />
      <Contact />
      <ScrollToTop />
    </div>
  );
}

export default App;
