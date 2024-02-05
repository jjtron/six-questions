import * as https from 'https';
import z, { number } from "zod";
import { mutateData } from './database';
import { v4 as uuidv4 } from 'uuid';

const genericExample = z.object({
  el: z.string()
});
export async function getRecords() {
  return [[0,1,2,3,4,5,6]];
}
export async function getData() {
  return new Promise((resolve: any, reject: any) => {
    let url: Object;
      url = {
        host: 'api.congress.gov',
        path: '/v3/bill?api_key=O5cpoc3OD9qRLRA6YfxSmpuZkCRpiSkIYfMXsrFN',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    
    https.get(url, (resp: any) => {
      let data: any = '';
      resp.setEncoding('utf8');
      resp.on('data', (chunk: any) => {
        data += chunk;
      });
      resp.on('end', () => {
        if (!genericExample.safeParse(JSON.parse(data)).success) {
          resolve([[0, 1, 2],[3, 4, 5]]);
          /*
          reject({
            error: "Datatype error",
            data: JSON.parse(data)
          });
          */
        } else {
          resolve(JSON.parse(data));
        }
      })
    }).on("error", (err: any) => {
      reject("Error: " + err.message);
    });
  });
}
