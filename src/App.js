import { Card, CssBaseline, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Motion, spring } from "react-motion";
import ToolBackground from "./components/ToolBackground";
import useMousePosition from "./hooks/useMousePosition";


const App = () => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },

  });

  const [windowSize, setWindowSize] = useState({ x: window.innerWidth, y: window.innerHeight, });

  useEffect(() => {
    const handleWindowResize = () => setWindowSize({ x: window.innerWidth, y: window.innerHeight, });
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ToolBackground propNumber={50} />
      <Motion
              defaultStyle={{ opacity: 0, x: window.innerWidth / 2, y: window.innerHeight / 2 }}
              style={{ opacity: spring(1), x: spring(windowSize.x / 2), y: spring(windowSize.y / 2), }}>
        {style => <Card style={{ opacity: style.opacity, margin: '5px', padding: '5px', width: 'min-content', height: 'min-content', position: 'absolute', transform: `translate(${style.x}px, ${style.y}px) translate(-50%, -50%) scale(${style.opacity})`, }}>
          <Typography variant="h1" style={{ userSelect: 'none' }}>404</Typography>
        </Card>}
      </Motion>
    </ThemeProvider>
  );
}

export default App;
