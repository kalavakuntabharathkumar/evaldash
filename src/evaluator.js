import {summarize} from "./metrics.js";
export function evaluateResponse(x){return {...x,expected:Boolean(x.expected),predicted:Boolean(x.predicted),hallucination:Boolean(x.hallucination),latencyMs:Number(x.latencyMs||0),createdAt:new Date().toISOString()};}
export function runEvaluation(dataset,predictor){
 const rows=dataset.map(item=>evaluateResponse({promptVersion:item.promptVersion,input:item.input,expected:item.expected,predicted:predictor(item),hallucination:item.hallucination,latencyMs:item.latencyMs}));
 return {rows,summary:summarize(rows)};
}
