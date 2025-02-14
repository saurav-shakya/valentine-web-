import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import EntryPage from './components/EntryPage';
import Dashboard from './components/Dashboard';
import ExRoast from './pages/ExRoast';
import RelationshipQuiz from './pages/RelationshipQuiz';
import { useState } from 'react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff1744',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
});

function App() {
  const [isSingle, setIsSingle] = useState<boolean>(true);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage setIsSingle={setIsSingle} />} />
          <Route path="/dashboard" element={<Dashboard isSingle={isSingle} />} />
          <Route path="/ex-roast" element={<ExRoast />} />
          <Route path="/relationship-quiz" element={<RelationshipQuiz />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
