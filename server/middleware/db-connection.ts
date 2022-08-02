const mysql = require('mysql');
import { cafe24DB } from '../config/db';

export const connection = mysql.createConnection({
  host: cafe24DB.HOST,
  user: cafe24DB.USER,
  password: cafe24DB.PASSWORD,
  database: cafe24DB.DB,
  multipleStatements: true,
  insecureAuth: true,
  typeCast: function (field: any, next: any) {
    if(field.type === 'VAR_STRING') {
      return field.string();
    }else if(field.type === 'BLOB'){
      return field.string();
    }
    return next();
  }
})

export const execute = (query: string)=>{
  return new Promise((resolve,reject)=>{
    connection.query(query, function (err: any, rows: any){
      if(err){
        reject(err);
      }
      else {
        resolve(rows);
      }
    })
  })
}

export const executeForInput = (query: string, value: string|number)=>{
  return new Promise((resolve,reject)=>{
    connection.query(query, value, function (err: any, rows: any){
      if(err){
        console.log(err);
        reject(err);
      }
      else {
        resolve(rows);
      }
    })
  })
}