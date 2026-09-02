import {mean} from "simple-statistics";

export function confusion(rows){
 let tp=0,tn=0,fp=0,fn=0;
 for(const r of rows){const e=Boolean(r.expected),p=Boolean(r.predicted);
  if(e&&p)tp++; else if(!e&&!p)tn++; else if(!e&&p)fp++; else fn++;}
 return {tp,tn,fp,fn};
}
export function precisionRecallF1(rows){
 const {tp,fp,fn}=confusion(rows);
 const precision=tp+fp?tp/(tp+fp):0, recall=tp+fn?tp/(tp+fn):0;
 return {precision,recall,f1:precision+recall?2*precision*recall/(precision+recall):0};
}
export function accuracy(rows){return rows.length?rows.filter(r=>Boolean(r.expected)===Boolean(r.predicted)).length/rows.length:0;}
export function hallucinationRate(rows){return rows.length?rows.filter(r=>r.hallucination).length/rows.length:0;}
export function bootstrapCI(rows,metricFn=accuracy,resamples=1000,seed=42){
 if(!rows.length)return {estimate:0,lower:0,upper:0};
 let state=seed>>>0; const rand=()=>{state=(1664525*state+1013904223)>>>0;return state/4294967296;};
 const vals=[];
 for(let b=0;b<resamples;b++){const sample=Array.from({length:rows.length},()=>rows[Math.floor(rand()*rows.length)]);vals.push(metricFn(sample));}
 vals.sort((a,b)=>a-b); const q=p=>vals[Math.min(vals.length-1,Math.floor(p*(vals.length-1)))];
 return {estimate:metricFn(rows),lower:q(.025),upper:q(.975)};
}
export function summarize(rows){
 const p=precisionRecallF1(rows);
 return {count:rows.length,accuracy:accuracy(rows),precision:p.precision,recall:p.recall,f1:p.f1,
 hallucinationRate:hallucinationRate(rows),latencyMeanMs:rows.length?mean(rows.map(r=>r.latencyMs)):0,
 confidenceInterval:bootstrapCI(rows)};
}
