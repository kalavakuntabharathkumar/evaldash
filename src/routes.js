import {Router} from "express";
import {sampleDataset} from "./dataset.js";
import {runEvaluation} from "./evaluator.js";
import {summarize} from "./metrics.js";
export function createRoutes(repository){
 const r=Router();
 r.post("/evaluations/run",async(req,res)=>{
  const dataset=req.body.dataset||sampleDataset(Number(req.body.count||100));
  const predictor=req.body.mode==="strict"?x=>x.expected:x=>x.expected||x.input.toLowerCase().includes("billing");
  const result=runEvaluation(dataset,predictor); await repository.insertMany(result.rows); res.json(result);
 });
 r.get("/evaluations",async(req,res)=>res.json(await repository.find(req.query.promptVersion?{promptVersion:req.query.promptVersion}: {},500)));
 r.get("/metrics/summary",async(_req,res)=>res.json(summarize(await repository.find({},5000))));
 r.get("/metrics/compare",async(req,res)=>{
  const a=await repository.find({promptVersion:req.query.promptA||"v1"},5000);
  const b=await repository.find({promptVersion:req.query.promptB||"v2"},5000);
  res.json({promptA:req.query.promptA||"v1",metricsA:summarize(a),promptB:req.query.promptB||"v2",metricsB:summarize(b)});
 });
 r.get("/datasets",(_req,res)=>res.json({available:["synthetic-support-200","synthetic-support-15000"]}));
 return r;
}
