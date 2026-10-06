import 'dotenv/config';
import { createRequire } from 'node:module';
import { Pinecone } from '@pinecone-database/pinecone';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { MistralAIEmbeddings } from "@langchain/mistralai";

import fs from 'fs';

const pdfParse = createRequire(import.meta.url)('pdf-parse');
let dataBuffer = fs.readFileSync('./Hammad CV1.pdf');

// const data = await pdfParse(dataBuffer);
const pc = new Pinecone({
  apiKey: process.env.PIPECONE_API_KEY,
});
const index = pc.Index("rag-intigration");

// console.log(data.text);
const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY, // Your Mistral API key
  model: "mistral-embed", // Default value
});



// const splitter = new RecursiveCharacterTextSplitter({
//      chunkSize: 400,
//      chunkOverlap: 0
//      })


// const chunks =await  splitter.splitText(data.text);

// const docs=await Promise.all(chunks.map(async(chunk)=>{
//     const embeddedChunk = await embeddings.embedQuery(chunk);
//     return{
//         text: chunk,
//         embedding: embeddedChunk
//     }

   
// }))

// const result=await index.upsert({
//    records: docs.map((doc, index) => ({
//     id: `doc-${index}`,
//     values: doc.embedding,
//     metadata:{
//         text: doc.text
//     }
 
//    }))
  
// })

// console.log(result);


// console.log(docs);


const queryEmbedding = await embeddings.embedQuery("What is the qualification of hammad?");

// console.log(queryEmbedding);
const queryResult = await index.query({
    vector: queryEmbedding,
    topK: 3,
    includeMetadata: true,
  });
console.log(JSON.stringify(queryResult));