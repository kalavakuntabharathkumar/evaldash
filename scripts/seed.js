import {sampleDataset} from "../src/dataset.js";
import {runEvaluation} from "../src/evaluator.js";
import {createRepository} from "../src/repository.js";
const repo=createRepository(process.env.MONGO_URI||"mongodb://localhost:27017/llm_eval");
const result=runEvaluation(sampleDataset(200),x=>x.expected); await repo.insertMany(result.rows);
console.log(JSON.stringify(result.summary,null,2));
