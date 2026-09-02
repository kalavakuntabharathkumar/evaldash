# LLM Evaluation and Accuracy Analytics Platform

Production-style Node.js evaluation platform using Express, React-style static UI,
MongoDB, Podman, n8n, Jest and simple-statistics.

## Features
- Automated evaluation pipeline
- Accuracy, precision, recall and F1
- Bootstrap confidence intervals
- Hallucination-rate tracking
- Prompt-version comparison
- MongoDB persistence with a repository boundary
- Podman/Docker-compatible container
- n8n importable workflow
- 15,000-row local benchmark
- Jest tests

The resume metrics are business-case figures; the included benchmark measures the
repository locally and does not claim to reproduce external production traffic.

## Start

```bash
npm install
cp .env.example .env
npm test
npm run seed
npm run dev
```

Open http://localhost:3000

Benchmark:
```bash
npm run benchmark
```

Podman:
```bash
podman compose up --build
```

API:
- POST `/api/evaluations/run`
- GET `/api/evaluations`
- GET `/api/metrics/summary`
- GET `/api/metrics/compare?promptA=v1&promptB=v2`
