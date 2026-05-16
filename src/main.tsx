import { createRoot } from "react-dom/client";
import React from "react";
import App from "./app/App.tsx";
import "./styles/index.css";

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {error: Error | null}> {
  constructor(props: any) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return (
        <div style={{background:'#0a2828',color:'white',padding:40,fontFamily:'monospace',fontSize:14}}>
          <h2 style={{color:'#ff6b6b'}}>Runtime Error</h2>
          <pre>{this.state.error.message}</pre>
          <pre>{this.state.error.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary><App /></ErrorBoundary>
);
