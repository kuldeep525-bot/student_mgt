import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./components/pages/Dashboard";
import NotesRoutes from "./components/routes/NotesRoutes";

const App = () => {
  return (
    <>
      <Navbar />
      <NotesRoutes />
    </>
  );
};

export default App;
