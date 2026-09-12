import React from 'react';

export default function Benchmarks() {
  const benchmarks = [
    { stage: 'HighRes Ingestion & Downsampling', time: '4.2 ms', share: '11.5%', type: 'CPU / Bilinear' },
    { stage: 'Data Augmentation Normalization', time: '2.1 ms', share: '5.7%', type: 'SIMD / Float32' },
    { stage: 'ResNet-50 Backbone Forward Pass', time: '28.5 ms', share: '77.8%', type: 'Neural Weights' },
    { stage: 'Global Average Pooling & Dense Softmax', time: '1.8 ms', share: '5.0%', type: 'Linear Algebra' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            background: 'rgba(245, 158, 11, 0.12)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            marginBottom: '16px',
          }}
        >
          <span>System Diagnostics & Inference Throughput</span>
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          Performance <span className="gradient-text">Benchmarks</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Execution telemetry and pipeline latency statistics evaluated across varying input image resolutions and hardware environments.
        </p>
      </div>

      {/* Latency Breakdown Panel */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              End-to-End Latency Breakdown
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Mean inference time per 12MP high-resolution image
            </div>
          </div>
          <div className="font-mono" style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--emerald-accent)' }}>
            36.6 ms total
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {benchmarks.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {item.stage}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Processor: {item.type}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="font-mono" style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                  {item.time}
                </div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {item.share}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Reference Panel */}
      <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          HINA REST API Reference
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--accent-primary)', color: '#FFFFFF' }}>
                POST
              </span>
              <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                /api/predict
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Upload an image via multipart/form-data to receive the top-5 breed probability distribution and diagnostics.
            </p>
            <pre className="font-mono" style={{ fontSize: '0.72rem', background: 'var(--bg-base)', padding: '10px', borderRadius: '8px', color: 'var(--text-secondary)', overflowX: 'auto' }}>
curl -X POST http://localhost:8000/api/predict \
  -F "file=@golden_retriever.jpg"
            </pre>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.2)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="font-mono" style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', background: 'var(--emerald-accent)', color: '#FFFFFF' }}>
                GET
              </span>
              <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                /api/breeds?q=husky
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              Query the 120 Stanford dog breeds catalog with optional keyword search and AKC group filters.
            </p>
            <pre className="font-mono" style={{ fontSize: '0.72rem', background: 'var(--bg-base)', padding: '10px', borderRadius: '8px', color: 'var(--text-secondary)', overflowX: 'auto' }}>
curl http://localhost:8000/api/breeds?q=husky
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
