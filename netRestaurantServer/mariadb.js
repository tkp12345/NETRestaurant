import mysql from 'mysql'

// const mysql = require('mysql');
export const connection = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password : 'netrestaurant',
    database : 'restaurant'
  });

