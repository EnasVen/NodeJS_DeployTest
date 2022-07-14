var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'nodejs',
    password: 'passw0rd',
    database: 'db01'
});

exports.query = (params) => {
    let promise = new Promise(
        function (resolve, reject) {
            var sql = 'SELECT*FROM foodinfo where foodid=?';
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
            var sql = 'DELETE FROM checklist WHERE ticketid=?';
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
                var sql = 'INSERT INTO checklist VALUES (?,?,?,?,NOW())';
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
            var sql = 'SELECT a.ticketid , a.cname , a.tel, a.buylist , b.fname , b.catalog , a.tstamp FROM db01.checklist a left join foodinfo b on a.buylist = b.foodid where a.ticketid = ?';
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
            var sql1 = 'DELETE FROM checklist WHERE ticketid=?';
            console.log(params);
            conn.query(sql1, params, (err, result) => {
                // params.map(s => s.replace(/\r?\n|\r/g, "").trim());
                console.log(params);
                console.log(params[3]);
                var buylist = params[3].split(',');
                // console.log(buylist);
                for (x of buylist){
                    var newParams = params;
                    var sql = 'INSERT INTO checklist VALUES (?,?,?,?,NOW())';
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