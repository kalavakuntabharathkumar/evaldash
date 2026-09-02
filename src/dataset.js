export function sampleDataset(count=200){
 const topics=["billing","login","shipping","refund","api"];
 return Array.from({length:count},(_,i)=>({id:`ROW-${i+1}`,promptVersion:i%2===0?"v1":"v2",input:`Customer asks about ${topics[i%topics.length]} #${i+1}`,expected:i%10!==0,hallucination:i%21===0,latencyMs:40+i%30}));
}
