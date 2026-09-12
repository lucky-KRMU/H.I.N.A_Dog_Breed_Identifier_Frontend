import React, { useState } from 'react';
import './Navbar.css';

export default function DynamicNavbar({
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  islandState = 'idle',
  processingProgress = 0,
  processingThumb = null,
  topPrediction = null,
  onResetInference,
  apiConnected = true,
}) {
  const [isPinned, setIsPinned] = useState(false);

  return (
    <header className="navbar-wrapper">
      <div className="navbar-container">
        {/* ================================================================
            Left: Brand HINA with seamless expanding fullform animation
            ================================================================ */}
        <div
          className={`brand-wrapper ${isPinned ? 'is-pinned' : ''}`}
          onClick={() => setIsPinned(!isPinned)}
          title="Click to keep expanded or hover to expand"
        >
          <div className="brand-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>

          <div className="hina-logo-text">
            {/* H -> HighRes */}
            <span className="hina-unit">
              <span className="hina-lead">H</span>
              <span className="hina-suffix">ighRes</span>
            </span>

            {/* I -> Image */}
            <span className="hina-unit">
              <span className="hina-lead">I</span>
              <span className="hina-suffix">mage</span>
            </span>

            {/* N -> Network */}
            <span className="hina-unit">
              <span className="hina-lead">N</span>
              <span className="hina-suffix">etwork</span>
            </span>

            {/* A -> Architecture */}
            <span className="hina-unit">
              <span className="hina-lead">A</span>
              <span className="hina-suffix">rchitecture</span>
            </span>
          </div>

          <span className="hina-badge">v1.4</span>
        </div>

        {/* ================================================================
            Center: Apple Dynamic Island Floating Pill
            ================================================================ */}
        <div className={`dynamic-island state-${islandState}`}>
          {/* 1. IDLE STATE */}
          {islandState === 'idle' && (
            <div className="island-idle-content">
              <div className="island-status-pill">
                <span className="status-indicator-dot"></span>
                <span>ResNet-50 224px Engine</span>
              </div>

              <div className="island-nav-tabs">
                <button
                  type="button"
                  className={`island-tab-btn ${activeTab === 'studio' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('studio')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  Studio
                </button>

                <button
                  type="button"
                  className={`island-tab-btn ${activeTab === 'architecture' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('architecture')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                  Architecture
                </button>

                <button
                  type="button"
                  className={`island-tab-btn ${activeTab === 'codex' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('codex')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                  120 Breeds
                </button>

                <button
                  type="button"
                  className={`island-tab-btn ${activeTab === 'benchmarks' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('benchmarks')}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 20V10" />
                    <path d="M12 20V4" />
                    <path d="M6 20v-6" />
                  </svg>
                  Metrics
                </button>
              </div>
            </div>
          )}

          {/* 2. PROCESSING / INFERENCE STATE */}
          {islandState === 'processing' && (
            <div className="island-processing-content">
              {processingThumb ? (
                <img src={processingThumb} alt="Inference input" className="island-mini-thumbnail" />
              ) : (
                <div className="status-indicator-dot"></div>
              )}

              <div className="island-processing-info">
                <div className="island-proc-title">
                  <span>Extracting HighRes Tensors...</span>
                  <span className="font-mono">{processingProgress}%</span>
                </div>
                <div className="island-proc-bar">
                  <div className="island-proc-fill" style={{ width: `${processingProgress}%` }}></div>
                </div>
              </div>

              <div className="neural-wave" title="Neural forward pass active">
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
              </div>
            </div>
          )}

          {/* 3. RESULT STATE */}
          {islandState === 'result' && (
            <div className="island-result-content">
              <div className="island-breed-badge">
                <div className="breed-icon-circle">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <span className="island-breed-name">
                    {topPrediction ? topPrediction.name : 'Match Detected'}
                  </span>
                </div>
              </div>

              {topPrediction && (
                <span className="island-conf-pill font-mono">
                  {topPrediction.confidence}% Match
                </span>
              )}

              <button
                type="button"
                className="island-reset-btn"
                onClick={onResetInference}
                title="Reset inference"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* ================================================================
            Right: Backend Status & Dark/Light Theme Switcher
            ================================================================ */}
        <div className="nav-controls">
          <div
            className={`api-status-pill ${apiConnected ? 'is-online' : 'is-standalone'}`}
            title={apiConnected ? 'Connected to FastAPI / Standalone backend' : 'Running in local client neural mode'}
          >
            <span
              className="status-indicator-dot"
              style={{ backgroundColor: apiConnected ? 'var(--emerald-accent)' : 'var(--amber-accent)' }}
            ></span>
            <span>{apiConnected ? 'API Connected' : 'Local Mode'}</span>
          </div>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark and light themes"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
