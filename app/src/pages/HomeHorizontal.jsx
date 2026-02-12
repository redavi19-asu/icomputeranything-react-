import { Routes, Route } from "react-router-dom";

function TestScreen() {
  return (
    <div style={{ padding: 24, color: "#fff" }}>
      <h1 style={{ margin: 0 }}>✅ React is rendering</h1>
      <p style={{ opacity: 0.8 }}>
        If you can see this text, routing + render is fine. Then we’ll plug your real Home back in.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TestScreen />} />
    </Routes>
  );
}
