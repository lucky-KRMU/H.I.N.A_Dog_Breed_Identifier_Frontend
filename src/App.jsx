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

  // Dynamic Island states: 'idle' | 'processing' | 'result'
  const [islandState, setIslandState] = useState('idle');
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingThumb, setProcessingThumb] = useState(null);
  const [topPrediction, setTopPrediction] = useState(null);

  // Backend connection health
  const [apiConnected, setApiConnected] = useState(false);

  // Apply theme attribute to html root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hina-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Check backend health periodically
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

  // Inference life-cycle callbacks
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
      {/* Ambient background glow layers */}
      <div className="canvas-bg">
        <div className="canvas-glow-1"></div>
        <div className="canvas-glow-2"></div>
        <div className="canvas-glow-3"></div>
      </div>

      {/* Enhanced Apple-Inspired Dynamic Island Sticky Navbar */}
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

      {/* 
          Main Bubble Pod Container
          - Rounded box coming forward from the depth with bubble lighting effect
          - Replaces the old straight vertical side lines
      */}
      <div className="bubble-pod">
        <main className="main-content">
          {activeTab === 'studio' && (
            <InferenceStudio
              onInferenceStart={handleInferenceStart}
              onInferenceProgress={handleInferenceProgress}
              onInferenceComplete={handleInferenceComplete}
              onResetInference={handleResetInference}
              apiConnected={apiConnected}
            />
          )}

          {activeTab === 'architecture' && <ArchitectureExplorer />}

          {activeTab === 'codex' && <BreedCodex />}

          {activeTab === 'benchmarks' && <Benchmarks />}
        </main>
      </div>

      {/* Enhanced Professional Multi-Column Footer */}
      <footer className="app-footer">
        <div className="footer-inner">
          <div className="footer-columns-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col-brand">
              <div className="footer-brand-title">
                <span className="gradient-text">HINA</span>
                <span className="footer-meta-pill">v1.4 Neural Engine</span>
              </div>
              <p className="footer-brand-tagline">
                <strong>HighRes Image Network Architecture</strong> — Deep canine vision and fine-grained breed classification powered by ResNet-50 residual feature extraction.
              </p>
              <div className="tech-chips-row">
                <span className="tech-chip font-mono">React 19</span>
                <span className="tech-chip font-mono">Keras 3</span>
                <span className="tech-chip font-mono">ResNet-50</span>
                <span className="tech-chip font-mono">FastAPI</span>
                <span className="tech-chip font-mono">Vite</span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <div className="footer-col-title">Navigation</div>
              <ul className="footer-links-list">
                <li onClick={() => setActiveTab('studio')}>
                  <span>→</span> Inference Studio
                </li>
                <li onClick={() => setActiveTab('architecture')}>
                  <span>→</span> Neural Architecture
                </li>
                <li onClick={() => setActiveTab('codex')}>
                  <span>→</span> 120 Breeds Library
                </li>
                <li onClick={() => setActiveTab('benchmarks')}>
                  <span>→</span> Performance Metrics
                </li>
              </ul>
            </div>

            {/* Column 3: Architecture Specs */}
            <div>
              <div className="footer-col-title">Architecture</div>
              <ul className="footer-links-list">
                <li>Backbone: ResNet-50</li>
                <li>Params: 23,587,712</li>
                <li>Input: 224 × 224 × 3 RGB</li>
                <li>Classes: 120 Stanford Breeds</li>
                <li>Accuracy: 85% (Test &amp; Val)</li>
                <li>Pooling: GlobalAveragePooling2D</li>
              </ul>
            </div>

            {/* Column 4: System Telemetry */}
            <div className="footer-system-status">
              <div className="footer-col-title">System Telemetry</div>
              <div className="footer-status-card">
                <div className="footer-status-row">
                  <span style={{ color: 'var(--text-muted)' }}>Backend Engine:</span>
                  <span className="font-mono" style={{ color: apiConnected ? 'var(--emerald-accent)' : 'var(--amber-accent)', fontWeight: 600 }}>
                    {apiConnected ? 'FastAPI Online' : 'Standalone Fallback'}
                  </span>
                </div>
                <div className="footer-status-row">
                  <span style={{ color: 'var(--text-muted)' }}>Mean Latency:</span>
                  <span className="font-mono" style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>
                    36.6 ms
                  </span>
                </div>
                <div className="footer-status-row">
                  <span style={{ color: 'var(--text-muted)' }}>Precision:</span>
                  <span className="font-mono" style={{ color: 'var(--text-primary)' }}>
                    Float32 Tensors
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar font-mono">
            <div>© {new Date().getFullYear()} HINA — HighRes Image Network Architecture. Built by <strong>Lucky Pawar</strong>. All rights reserved.</div>
            <div>Trained on Stanford Dogs Dataset & ImageNet-1k</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
