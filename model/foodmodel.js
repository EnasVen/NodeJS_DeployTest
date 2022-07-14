var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net',
    user: 'ba457097dc58b9',
    password: 'd720c7af',
    database: 'heroku_f6720d51623cf1f'
});

exports.query = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            var sql = 'SELECT*FROM heroku_f6720d51623cf1f.foodinfo where foodid=?';
            conn.query(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(JSON.stringify(result));
            });
        }
    );
    return promise;
};


exports.delete = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            var sql = 'DELETE FROM heroku_f6720d51623cf1f.checklist WHERE ticketid=?';
            conn.query(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(JSON.stringify({ 'result': 1 }));
            });
        }
    );
    return promise;
};



exports.insert = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            var buylist = params[3].split(',');
            // console.log(params);
            // console.log(buylist);
            for (x of buylist){
                var newParams = params;
                var sql = 'INSERT INTO heroku_f6720d51623cf1f.checklist VALUES (?,?,?,?,NOW())';
                newParams[3] = x;
                conn.query(sql, newParams, (err, result) => {
                    if (err) reject(err);
                    else resolve(JSON.stringify({ 'result': 1 }));
                });
            }
        }
    );
    return promise;
};


exports.update = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            var sql = 'SELECT a.ticketid , a.cname , a.tel, a.buylist , b.fname , b.catalog , a.tstamp FROM heroku_f6720d51623cf1f.checklist a left join heroku_f6720d51623cf1f.foodinfo b on a.buylist = b.foodid where a.ticketid = ?';
            conn.query(sql, params, (err, result) => {
                if (err) reject(err);
                else resolve(JSON.stringify(result));
            });
        }
    );
    return promise;
};

exports.updatechk = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            // 首先刪除相關資料
            var sql1 = 'DELETE FROM heroku_f6720d51623cf1f.checklist WHERE ticketid=?';
            console.log(params);
            conn.query(sql1, params, (err, result) => {
                // params.map(s => s.replace(/\r?\n|\r/g, "").trim());
                console.log(params);
                console.log(params[3]);
                var buylist = params[3].split(',');
                // console.log(buylist);
                for (x of buylist){
                    var newParams = params;
                    var sql = 'INSERT INTO heroku_f6720d51623cf1f.checklist VALUES (?,?,?,?,NOW())';
                    newParams[3] = x;
                    conn.query(sql, newParams, (err, result) => {
                        if (err) reject(err);
                    });
                }
                resolve(JSON.stringify({ 'result': 1 }));
            });
        }
    );
    return promise;
};