# HINA — HighRes Image Network Architecture (Frontend)

HINA is a state-of-the-art neural platform for canine computer vision and high-resolution image analysis trained on the Stanford Dogs Dataset (120 breeds) powered by a ResNet-50 deep feature extractor.

## Features
- **Apple Dynamic Island-Inspired Floating Navbar**:
  - Live status indicator (ResNet-50 224px Engine)
  - Interactive morphing states (Idle, Processing with animated neural waveforms, and Top Match Badge)
  - **HINA** logo on the left with seamless hover/tap typography expansion into **HighRes Image Network Architecture**
  - Instant dark and light theme toggle with persistent storage
- **High-Resolution Inference Studio**:
  - Drag-and-drop image upload with clipboard paste support
  - 1-click curated canine presets (Siberian Husky, Golden Retriever, French Bulldog, Samoyed, German Shepherd, Corgi, Rottweiler, Border Collie)
  - High-res image diagnostics (resolution, aspect ratio, file size, sharpness score, 224×224 crop viewfinder)
  - Top-5 probability distribution bar charts
  - Class Activation Map (CAM) neural attention heatmap toggle
- **Neural Architecture Explorer**:
  - Step-by-step breakdown of `model_fe_da.keras` (InputLayer, DataAugmentation, ResNet-50 backbone, GlobalAveragePooling2D, Dense Softmax)
- **Canine Codex**:
  - Searchable and group-filterable directory of all 120 Stanford dog breeds
- **Performance Benchmarks & API Telemetry**:
  - Latency breakdown and cURL reference for the REST API

## Development
```bash
# Start frontend development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```
