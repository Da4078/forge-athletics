import Navbar from "./components/Navbar"
import Hero from "./sections/Hero"
import Programs from "./sections/Programs";
import About from "./sections/About";
import Membership from "./sections/Membership";
import Trainers from "./sections/Trainers";
import Footer from "./sections/Footer";

function App() {
  return (
    <>
      <Navbar/>
      <Hero/>
      <About />
      <Membership />
      <Trainers />
    </>
  );
}

export default App;
