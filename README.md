# HINA — HighRes Image Network Architecture (Frontend)

**Author**: Lucky Pawar  
**Version**: 1.4.0  
**Model Accuracy**: 85% (Test & Validation — Stanford Dogs Dataset, 120 classes)

HINA is a state-of-the-art neural platform for canine computer vision and high-resolution image analysis. Built on a **fine-tuned ResNet-50** architecture trained on the Stanford Dogs Dataset (120 breeds), achieving **85% test & validation accuracy**.

---

## Features

- **Apple Dynamic Island-Inspired Floating Navbar**:
  - Live status indicator (ResNet-50 224px Engine)
  - Interactive morphing states (Idle → Processing with neural wave bars → Top Match Badge)
  - **HINA** logo on the left with seamless hover/tap typography expansion into **HighRes Image Network Architecture**
  - Instant dark and light theme toggle with persistent `localStorage` storage

- **High-Resolution Inference Studio**:
  - Drag-and-drop image upload with clipboard paste support (`Cmd+V` / `Ctrl+V`)
  - Memory-safe file handling with `URL.revokeObjectURL` cleanup on unmount
  - Dedicated Clear Image button and input value reset for repeated same-file uploads
  - 1-click curated canine presets (Siberian Husky, Golden Retriever, French Bulldog, Samoyed, German Shepherd, Corgi, Rottweiler, Border Collie)
  - High-res image diagnostics (resolution, aspect ratio, file size, sharpness score, 224×224 crop viewfinder)
  - Top-5 probability distribution bar charts with safe width clamping
  - Class Activation Map (CAM) neural attention heatmap toggle

- **Neural Architecture Explorer**:
  - Step-by-step breakdown of `model_fe_da.keras`
  - InputLayer → Data Augmentation → ResNet-50 backbone (fine-tuned last block + head, 85% accuracy) → GlobalAveragePooling2D → Dense(120) Softmax

- **Canine Codex**:
  - Searchable and AKC group-filterable directory of all 120 Stanford dog breeds

- **Performance Benchmarks & API Telemetry**:
  - Model accuracy metrics panel (85.0% Top-1 & Validation Accuracy)
  - End-to-end latency breakdown (36.6 ms mean inference)
  - Full REST API cURL reference documentation

---

## Typography Suite

| Font | Role | Description |
|---|---|---|
| **Rubik** (300–900 variable) | Primary body & UI | Modern geometric sans-serif for fluid reading |
| **Overlock SC** | Brand display & HINA logo | Distinctive small-caps display font for HINA branding |
| **Sansation** | Labels, chips, metadata | Elegant sans-serif for telemetry and badges |
| **JetBrains Mono** | Code & monospace | High-legibility developer monospace for metrics and shapes |

---

## Theme System

- **Dark Mode** (default): Golden Amber `#F59E0B` + Emerald Green `#10B981` cyber-solar palette (no blue, no orange)
- **Light Mode**: Amber `#D97706` + Emerald `#059669` daylight palette
- Theme persisted in `localStorage` and automatically syncs with system `prefers-color-scheme`

---

## Development

```bash
# Install dependencies
npm install

# Start frontend development server (port 5173)
npm run dev

# Build for production
npm run build

# Run linter (oxlint)
npm run lint
```

---

*HINA — HighRes Image Network Architecture. Built by Lucky Pawar.*
