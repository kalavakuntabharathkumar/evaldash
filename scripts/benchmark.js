import {sampleDataset} from "../src/dataset.js";
import {runEvaluation} from "../src/evaluator.js";
const start=performance.now(); const data=sampleDataset(15000);
const result=runEvaluation(data,x=>x.expected||x.input.includes("billing"));
console.log(`Evaluated ${data.length} rows in ${(performance.now()-start).toFixed(1)} ms`);
console.log(JSON.stringify(result.summary,null,2));
