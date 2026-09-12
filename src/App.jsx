import React, { useState, useEffect } from 'react';
import './styles/theme.css';
import './App.css';
import DynamicNavbar from './components/DynamicNavbar';
import InferenceStudio from './components/InferenceStudio';
import ArchitectureExplorer from './components/ArchitectureExplorer';
import BreedCodex from './components/BreedCodex';
import Benchmarks from './components/Benchmarks';

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('hina-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  // Active view tab: 'studio' | 'architecture' | 'codex' | 'benchmarks'
  const [activeTab, setActiveTab] = useState('studio');

  // Dynamic Island states
  const [islandState, setIslandState] = useState('idle'); // 'idle' | 'processing' | 'result'
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingThumb, setProcessingThumb] = useState(null);
  const [topPrediction, setTopPrediction] = useState(null);

  // Backend connection status
  const [apiConnected, setApiConnected] = useState(false);

  // Apply theme to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hina-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check backend health
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/health', { method: 'GET' });
        if (res.ok) {
          setApiConnected(true);
        } else {
          setApiConnected(false);
        }
      } catch {
        setApiConnected(false);
      }
    };
    checkApi();
    const timer = setInterval(checkApi, 10000);
    return () => clearInterval(timer);
  }, []);

  // Inference callbacks
  const handleInferenceStart = (thumbUrl) => {
    setProcessingThumb(thumbUrl);
    setProcessingProgress(15);
    setIslandState('processing');
  };

  const handleInferenceProgress = (progress) => {
    setProcessingProgress(progress);
  };

  const handleInferenceComplete = (prediction) => {
    setProcessingProgress(100);
    setTopPrediction(prediction);
    setTimeout(() => {
      setIslandState('result');
    }, 300);
  };

  const handleResetInference = () => {
    setIslandState('idle');
    setTopPrediction(null);
    setProcessingProgress(0);
    setProcessingThumb(null);
  };

  return (
    <div className="app-shell">
      {/* Dynamic ambient canvas background blur */}
      <div className="canvas-bg">
        <div className="canvas-glow-1"></div>
        <div className="canvas-glow-2"></div>
      </div>

      {/* Apple Dynamic Island Inspired Sticky Navbar */}
      <DynamicNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        theme={theme}
        toggleTheme={toggleTheme}
        islandState={islandState}
        processingProgress={processingProgress}
        processingThumb={processingThumb}
        topPrediction={topPrediction}
        onResetInference={handleResetInference}
        apiConnected={apiConnected}
      />

      {/* Main Content Workspace */}
      <main className="main-content">
        {activeTab === 'studio' && (
          <InferenceStudio
            onInferenceStart={handleInferenceStart}
            onInferenceProgress={handleInferenceProgress}
            onInferenceComplete={handleInferenceComplete}
            apiConnected={apiConnected}
            lastInferenceResult={topPrediction}
          />
        )}

        {activeTab === 'architecture' && <ArchitectureExplorer />}

        {activeTab === 'codex' && <BreedCodex />}

        {activeTab === 'benchmarks' && <Benchmarks />}
      </main>

      {/* Sleek App Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-brand">
              <span className="gradient-text" style={{ fontWeight: 800 }}>HINA</span>
              <span style={{ color: 'var(--text-muted)' }}> — HighRes Image Network Architecture</span>
            </div>
            <div className="footer-note">
              Deep canine vision platform powered by ResNet-50 feature extraction & Stanford 120 Dogs dataset.
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-pill font-mono">ResNet-50 v1.4</div>
            <div className="footer-pill font-mono">224×224 RGB</div>
            <div className="footer-pill font-mono">120 Classes</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
