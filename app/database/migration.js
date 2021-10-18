const pool = require('./pool');
pool.on('connect',()=>{
    console.log('connected to db');
});

function createConsumerTable (){
    const query =  `CREATE TABLE IF NOT EXISTS consumer
    (id SERIAL PRIMARY KEY, 
        jenis VARCHAR(15) NOT NULL, 
    nama VARCHAR(30) UNIQUE NOT NULL , 
    alamat VARCHAR(40) NOT NULL, 
    kab_kota VARCHAR(15) NOT NULL, 
    provinsi VARCHAR(15) NOT NULL, 
    kecamatan VARCHAR(15) NOT NULL, 
    kelurahan VARCHAR(15) NOT NULL, 
    no_telp VARCHAR(15) NOT NULL
    )
    `;

    pool.query(query)
    .then((res)=>{
        console.log(res);
        pool.end();
    }).catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const dropConsumerTable=()=>{
    const query = 'drop table if exists consumer';
    pool.query(query)
    .then((res)=>{
        console.log(res);
        pool.end();
    }).catch((err)=>{
        console.log(err);
        pool.end();
    });
};

const createAllTables=()=>{
    createConsumerTable();
    
};

const dropAllTables = ()=>{
    dropConsumerTable();
    
};

pool.on('remove',()=>{
    console.log('dced');
    process.exit(0);

});

module.exports= {
    createAllTables,
    dropAllTables
};

require('make-runnable/custom')({
    printOutputFrame: false
  });