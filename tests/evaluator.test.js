import {runEvaluation} from "../src/evaluator.js";
test("evaluation runner",()=>{const d=[{promptVersion:"v1",input:"a",expected:true,hallucination:false,latencyMs:10},{promptVersion:"v1",input:"b",expected:false,hallucination:false,latencyMs:20}];const o=runEvaluation(d,x=>x.expected);expect(o.rows).toHaveLength(2);expect(o.summary.accuracy).toBe(1);});
