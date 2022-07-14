var foodmodel = require('../model/foodmodel');

// exports.queryall = (req, res) => {
//     foodmodel.queryall().then((data) => {
//         data = JSON.parse(data);
//         res.render('../views/emp/queryall', { emps: data });
//     }).catch((err) => {
//         console.log("Error: " + err);
//     });
// };


exports.query = (req, res) => {
    var params = [req.query.foodid];
    foodmodel.query(params).then((data) => {
        data = JSON.parse(data);
        if (!data.length) {
            res.send('Query Fail ! No such data !');
        } else {
            res.render('../views/food/query', { emps: data });
        }
    }).catch((err) => {
        console.log("Error: " + err);
    });
};

exports.delete = (req, res) => {
    var params = [req.query.ticketid];
    foodmodel.delete(params).then((data) => {
        data = JSON.parse(data);
        // console.log(data);
        // console.log(typeof data);
        if (data.result == '1') {
            res.render("../views/food/deleteComplete" , { emps: data });
            // res.redirect('http://localhost:8181/');
        };
    }).catch((err) => {
        res.send('Delete Fail !!');
        // console.log("Error: " + err);
    });
};


exports.insert = (req, res) => {
    var params = [req.sessionID , req.body.cname, req.body.tel , req.body.buylist];
    foodmodel.insert(params).then((data) => {
        data = JSON.parse(data);
        if (data.result == '1') {
            res.send(`感謝訂購 !! 您的訂單編號是 ${req.sessionID} !!`);
            // res.redirect(302,'http://localhost:8181/');
        }
        // console.log(data);
        // console.log(typeof data);
    }).catch((err) => {
        console.log("Error: " + err);
    });
};

exports.update = (req, res) => {
    var params = [req.body.ticketid];
    foodmodel.update(params).then((data) => {
        data = JSON.parse(data);
        if (!data.length) {
            res.send('查無此訂單資料!! ');
        } else {
            res.render('../views/food/updatechk', { emps: data });
        }
    }).catch((err) => {
        console.log("Error: " + err);
    });
};

exports.updatechk = (req, res) => {
    var params = [req.body.ticketid, req.body.cname , req.body.tel , req.body.foodid ] ;
    // console.log(params);
    foodmodel.updatechk(params).then((data) => {
        data = JSON.parse(data);
        console.log(data);
        // res.render("../views/food/updateComplete"  , { emps: data });
        // res.send(`成功變更訂單! 您的訂單編號為 ${req.body.ticketid} !`);
        // res.sendFile('updateComplete.html' , {root:'C:/nodejs/project3/views/food/'} );
        if (data.result == '1') {
            // res.send(`成功變更訂單! 您的訂單編號為 ${req.body.ticketid} !`);
            res.render("../views/food/updateComplete"  , { emps: data });
        };
    }).catch((err) => {
        console.log("Error: " + err);
    });
};