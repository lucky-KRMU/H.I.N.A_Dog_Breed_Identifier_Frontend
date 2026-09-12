import React, { useState } from 'react';

const PIPELINE_LAYERS = [
  {
    id: 0,
    title: 'HighRes Tensor Ingestion',
    layerName: 'InputLayer (input_layer_1)',
    outputShape: '[Batch, 224, 224, 3]',
    params: 0,
    type: 'Tensor Ingestion',
    color: '#F59E0B',
    description: 'Accepts high-resolution RGB imagery of arbitrarily high megapixels, downsampled and center-cropped to the canonical 224×224 receptive field with float32 normalization.',
    details: [
      { key: 'Input Resolution', val: '224 × 224 px' },
      { key: 'Color Channels', val: '3 (sRGB Red, Green, Blue)' },
      { key: 'Tensor Precision', val: 'Float32 [0.0, 1.0]' },
      { key: 'Memory Footprint', val: '602 KB / tensor batch' }
    ]
  },
  {
    id: 1,
    title: 'Neural Data Augmentation',
    layerName: 'RandomFlip + Translation + Rotation',
    outputShape: '[Batch, 224, 224, 3]',
    params: 0,
    type: 'Augmentation Preprocessing',
    color: '#EAB308',
    description: 'Applies real-time invariant transformations to emulate varied camera orientations, lighting conditions, and dog postures during training and evaluation.',
    details: [
      { key: 'Random Flip', val: 'Horizontal mode (p=0.5)' },
      { key: 'Random Translation', val: 'Height ±10%, Width ±10%' },
      { key: 'Random Rotation', val: 'Factor 0.15 (±54 degrees)' },
      { key: 'Invariance', val: 'Affine & Geometric invariance' }
    ]
  },
  {
    id: 2,
    title: 'ResNet-50 Deep Feature Extractor',
    layerName: 'Functional (resnet50 backbone)',
    outputShape: '[Batch, 7, 7, 2048]',
    params: 23587712,
    type: 'Deep Residual Backbone',
    color: '#84CC16',
    description: '50-layer deep convolutional backbone utilizing bottleneck building blocks with identity shortcut connections [y = F(x, {Wi}) + x]. Extracts multi-scale hierarchical canine representations from low-level edges (snout contours, fur textures) to high-level semantic breed anatomy (ear shape, skull proportions).',
    details: [
      { key: 'Total Parameters', val: '23,587,712 parameters' },
      { key: 'Residual Blocks', val: '16 Bottleneck Residual Units' },
      { key: 'Skip Connections', val: 'Identity shortcuts F(x) + x' },
      { key: 'Pretraining', val: 'ImageNet-1k transfer weights' }
    ]
  },
  {
    id: 3,
    title: 'Global Spatial Pooling',
    layerName: 'GlobalAveragePooling2D',
    outputShape: '[Batch, 2048]',
    params: 0,
    type: 'Dimensionality Reduction',
    color: '#22C55E',
    description: 'Compresses the 7×7 spatial feature maps into a single 2048-dimensional dense latent vector by calculating the average over each spatial channel, enforcing spatial translation invariance.',
    details: [
      { key: 'Spatial Ingestion', val: '7 × 7 feature map' },
      { key: 'Latent Dimension', val: '2048-dim vector' },
      { key: 'Parameter Count', val: '0 (Deterministic average)' },
      { key: 'Dropout Rate', val: '0.2 spatial regularization' }
    ]
  },
  {
    id: 4,
    title: '120-Class Softmax Classifier',
    layerName: 'Dense (Softmax Activation)',
    outputShape: '[Batch, 120]',
    params: 245880,
    type: 'Probabilistic Classification Head',
    color: '#10B981',
    description: 'Maps the 2048-dimensional canine feature representation into 120 distinct probability logits via softmax normalization, yielding the likelihood distribution across all Stanford Dog breeds.',
    details: [
      { key: 'Output Neurons', val: '120 classes' },
      { key: 'Weights Matrix', val: '2048 × 120 = 245,760' },
      { key: 'Biases', val: '120 units' },
      { key: 'Activation Function', val: 'Softmax: exp(z_i) / Σ exp(z_j)' }
    ]
  }
];

export default function ArchitectureExplorer() {
  const [selectedLayer, setSelectedLayer] = useState(PIPELINE_LAYERS[2]);

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
          <span>Computational Graph Inspection</span>
        </div>
        <h2 style={{ fontSize: '2.4rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
          HINA Deep Learning <span className="gradient-text">Architecture</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
          Direct inspection of the compiled Sequential model <code>model_fe_da.keras</code>, detailing tensor transformations from raw high-res pixels down to 120-class softmax probabilities.
        </p>
      </div>

      {/* Interactive Step-by-Step Flow Pipeline */}
      <div
        className="glass-panel"
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Pipeline Sequence (5 Core Stages)
          </span>
          <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--accent-secondary)' }}>
            Total Parameters: 23,833,592
          </span>
        </div>

        {/* Pipeline Nodes Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
          }}
        >
          {PIPELINE_LAYERS.map((layer, index) => {
            const isSelected = selectedLayer.id === layer.id;
            return (
              <div
                key={layer.id}
                onClick={() => setSelectedLayer(layer)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '16px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(245, 158, 11, 0.14)' : 'var(--bg-card)',
                  border: `1px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s var(--spring-smooth)',
                  boxShadow: isSelected ? '0 0 20px rgba(245, 158, 11, 0.3)' : 'var(--shadow-sm)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: layer.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    Stage 0{index + 1}
                  </span>
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: layer.color,
                    }}
                  ></span>
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {layer.title}
                </div>
                <div className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {layer.outputShape}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Layer Deep Dive Card */}
        <div
          style={{
            padding: '24px',
            borderRadius: '14px',
            background: 'rgba(0, 0, 0, 0.2)',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {selectedLayer.title}
              </div>
              <div className="font-mono" style={{ fontSize: '0.85rem', color: selectedLayer.color, marginTop: '2px' }}>
                {selectedLayer.layerName}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                Output: {selectedLayer.outputShape}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: '0.78rem',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                }}
              >
                {selectedLayer.params.toLocaleString()} params
              </span>
            </div>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            {selectedLayer.description}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
              paddingTop: '8px',
            }}
          >
            {selectedLayer.details.map((item, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                  {item.key}
                </div>
                <div className="font-mono" style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '4px' }}>
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
