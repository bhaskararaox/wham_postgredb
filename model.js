const Pool = require('pg').Pool;
const connectionString = 'postgres://wham_postgresdb_so:y3w1f8wS6Ov8pTw@postgres5990-lb-fm-in.dbaas.intel.com:5432/wham_postgresdb?options=-c search_path=wham_schema';
const pool = new Pool({
  connectionString
});

const getData = (queryInput) => {
  return new Promise(function(resolve, reject) {  
      pool.query(queryInput, (error, results) => {
      if (error) {
        reject(error)
      }
	  //resolve(results.rows);
    resolve(JSON.parse(JSON.stringify(results.rows)));
    })
  }) 
}

const getTables = () => {
  return new Promise(function(resolve, reject) {    
      pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'wham_schema';", (error, results) => {
      if (error) {
        reject(error)
      } 
    //resolve(results.rows);
    resolve(JSON.parse(JSON.stringify(results.rows)));
    })
  }) 
}

const getColumns = (tableName) => {
  return new Promise(function(resolve, reject) { 
    var qry= "SELECT column_name,data_type FROM information_schema.columns WHERE table_schema = 'wham_schema' AND table_name = '"+tableName+"';";
      
      pool.query(qry, (error, results) => {
      if (error) {
        reject(error)
      } 
    //resolve(results.rows);
    resolve(JSON.parse(JSON.stringify(results.rows)));
    })
  }) 
}

const getConstraints = (tableConstraint) => {
  return new Promise(function(resolve, reject) { 
    var qry= "SELECT table_name, constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_schema = 'wham_schema' AND constraint_type not like '%CHECK' AND table_name = '"+tableConstraint+"';";
     pool.query(qry, (error, results) => {
      if (error) {
        reject(error)
      } 
    //resolve(results.rows);
    resolve(JSON.parse(JSON.stringify(results.rows)));
    })
  }) 
}



module.exports = {
  getData, getTables, getColumns, getConstraints
}