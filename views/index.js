const express = require ('express');
const { Router } = require ('express');
const axios = require ('axios');
const {user_game} = require ('./models');

const routes = Router();

routes.use(express.urlencoded({extended: true}));

routes.use('/assets', express.static("./views/assets"));

//header authorization 
routes.get("/", async (req, res) => {
    const { page } = req.query;

    const hasil = await axios({
        url: "http://localhost:9999/api/v1/data",
        method: "GET",
        params: { page },
        headers: {
            authorization: "qwerty98765"
        }
    });
    
    return res.render("home", {
        items: hasil.data
    });
});

routes.get("/", (req, res) => {
    res.render("home")
});

routes.get("/login", (req, res) => {
    res.render("login")
});

routes.get("/signup", (req, res) => {
    res.render("signup")
});

routes.get("/gamesuit", (req, res) => {
    res.render("gamesuit")
});

//coba post username
routes.get("/login", async (req, res) => {
    return res.render("login", {
        onSubmit: () => {
            console.log("hello");
        },
    });
});

routes.post("/login", async (req, res) => {
    const {username, password} = req.body;

    user_game.findOne({
        where:{
            username: username,
            password: password
        }
    }).then(response => {
        if (response != null && response.isSuperAdmin == true){
            res.send('user found!')
        }else{
            res.send('user not found')
        }
    })

    // const data = axios({
    //     url: "http://localhost:9999/api/v1/data",
    //     method: "POST",
    //     data: {
    //         username,
    //         password
    //     },
    //     headers: {
    //         authorization: "qwerty98765"
    //     }
    // });
    return res.status(302).redirect("/");    
});

//coba signup
// routes.get("/signup", (req,res) => {
//     res.render("signup")
// });

// routes.post("/signup", (req,res) => {
//     const {username, password, first_name, last_name, birth_place} = req.body

//     user_game.findOne({
//         where: {
//             username: username,
//             password: password
//         }
//     }).then(response => {
//         if(response != null){
//             res.send('user found!')
//         }else{
//             res.send('user not found')
//         }
//     })
// })

routes.get("/signup", async (req, res) => {
    return res.render("signup", {
        onSubmit: () => {
            console.log("signup");
        },
    });
});

routes.post("/signup", async (req, res) => {
    const {first_name, last_name, birth_place, username, password} = req.body;

    const data = axios({
        url: "http://localhost:9999/api/v1/data",
        method: "POST",
        data: {
            first_name,
            last_name,
            birth_place,
            username,
            password
        },
        headers: {
            authorization: "qwerty98765"
        }
    });
    return res.status(302).redirect("/");    
});

export default routes;