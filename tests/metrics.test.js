import {accuracy,precisionRecallF1,hallucinationRate,bootstrapCI} from "../src/metrics.js";
const rows=[{expected:true,predicted:true,hallucination:false},{expected:true,predicted:false,hallucination:true},{expected:false,predicted:false,hallucination:false},{expected:false,predicted:true,hallucination:false}];
test("accuracy",()=>expect(accuracy(rows)).toBe(.5));
test("precision recall f1",()=>{const m=precisionRecallF1(rows);expect(m.precision).toBe(.5);expect(m.recall).toBe(.5);expect(m.f1).toBe(.5);});
test("hallucination rate",()=>expect(hallucinationRate(rows)).toBe(.25));
test("bootstrap interval",()=>{const c=bootstrapCI(rows,accuracy,100,1);expect(c.lower).toBeLessThanOrEqual(c.estimate);expect(c.upper).toBeGreaterThanOrEqual(c.estimate);});
