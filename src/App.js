import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import './App.css';
import { Home } from "./components/home"
function App() {
  return (
    <div className="App">
        <div class="header">
          <MusicNoteOutlinedIcon fontSize="large"/>
          <div className="heading">Song Preview Github</div>
          <MusicNoteOutlinedIcon fontSize="large"/>
        </div>
        <Home />
    </div>
  );
}

export default App;
