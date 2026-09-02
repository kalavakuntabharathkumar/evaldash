# Architecture

dataset -> evaluator -> metrics -> repository -> Express API -> dashboard

`evaluator.js` handles normalized evaluation records. `metrics.js` owns statistical
functions and deterministic bootstrap resampling. `repository.js` isolates MongoDB.
The n8n workflow is orchestration around the HTTP API rather than business logic.
