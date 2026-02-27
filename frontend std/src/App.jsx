import Navbar from "./components/Navbar/Navbar";
import NotesRoutes from "./components/routes/NotesRoutes";
import NotesProvider from "./context/NotesContext";
import "./index.css";
const App = () => {
  return (
    <>
      {/* <NotesProvider> */}
      <Navbar />
      <NotesRoutes />
      {/* <AdminLayout /> */}
      {/* </NotesProvider> */}
    </>
  );
};

export default App;
