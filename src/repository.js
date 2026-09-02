import {MongoClient} from "mongodb";
export function createRepository(uri){
 let client,collection;
 return {
  async connect(){
   if(collection)return collection;
   if(!uri)return null;
   client=new MongoClient(uri); await client.connect();
   collection=client.db().collection("evaluations"); return collection;
  },
  async insertMany(rows){const c=await this.connect(); if(!c)return rows; if(rows.length)await c.insertMany(rows); return rows;},
  async find(filter={},limit=100){const c=await this.connect(); if(!c)return []; return c.find(filter).limit(limit).toArray();}
 };
}
