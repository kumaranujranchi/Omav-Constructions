import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles
const style = document.createElement('style');
style.textContent = `
  :root {
    --primary: 220 47% 24%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 220 17% 32%;
    --secondary-foreground: 0 0% 100%;
    
    --accent: 35 95% 52%;
    --accent-foreground: 0 0% 100%;
    
    --gray-light: 210 40% 96.1%;
    --gray: 220 14% 80%;
    --gray-dark: 222 47% 11%;
    
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 222 47% 11%;
    
    --radius: 0.5rem;
    
    font-family: 'Inter', sans-serif;
  }

  html {
    scroll-behavior: smooth;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }
  
  .font-accent {
    font-family: 'Roboto Condensed', sans-serif;
  }
  
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }
`;

document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
