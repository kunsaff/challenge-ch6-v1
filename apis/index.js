const { Router, json } = require ('express');
const data = require ('./static/akun.json');
const routes = Router();

routes.use(json());

//authorization di header
routes.use((req, res, next) => { 
    if (req.headers.authorization === "qwerty98765") {
        return next();
    }

    return res.status(401).json({
        message: "Belum Log in"
    });
});

routes.get("/data", (req, res) =>{
    return res.status(200).json(data);
});

routes.get('/data/:id', (req, res) => {
    const {id} = req.params; 
    const result = data.data.find((d) => d.id === +id);
    return res.status(200).json({
        result: result
    });
});

routes.post("/data", (req, res) => {
    const { first_name, last_name, birth_place, username, password } = req.body;
    console.log({
        // firstname_be: first_name,
        // lastname_be: last_name,
        // birthplace_be: birth_place,
        username_be: username,
        password_be: password
    });

    //coba validasi (belum berhasil)
    // if (username == data.data.username) {
    //     console.log("beda")
    // } else {
    //     console.log("sama")
    // };

    // return res.status(200).json({
    //     message: "success"
    // })
});
module.exports = routes;
//export default routes;