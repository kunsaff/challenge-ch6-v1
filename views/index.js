const express = require ('express');
const { Router } = require ('express');
const axios = require ('axios');
const {user_game, user_game_biodata, user_game_history} = require ('../models');

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
            res.redirect('/dashboard')
        }else if(response !=null){
            res.redirect('/gamesuit')
        }
        else{
            //alert("User belum terdata");
            res.redirect('/login')
        }
    });   
});

//dashboard
routes.get("/dashboard", (req, res) => {
    user_game.findAll({
        include: user_game_biodata
    })
        .then(users => {
        res.render("dashboard", {
            users})
    })
});

//create new user
routes.post("/user", (req,res) => {
    const {first_name, last_name, birth_place, username, password} = req.body;
    user_game.create({
        username,
        password,
        isSuperAdmin: false
    }).then (user_game => {
        user_game_biodata.create({
            user_id: user_game.id,
            first_name,
            last_name,
            birth_place
        })
        .then(response =>{
            res.redirect('/dashboard')
        })
    })
});

//delete user yang tabel biodata sudah bisa ikut ter delete
routes.get('/user/:id/delete', (req, res) => {
    const {id} = req.params

    user_game.destroy({
        where: {id}
    }).then (response => {
        user_game_biodata.destroy({
            where: {user_id: id}
        }).then (response => {
            res.redirect('/dashboard')
        })
    });
});

routes.get('/user/:id/edit', (req, res) => {
    const {id} = req.params

    user_game.findOne({
        where: {id},
        include: user_game_biodata
    }).then(user => {
        res.render('edit', {user})
    });
});

routes.post('/user/:id/update', (req, res) => {
    const {id} = req.params
    const {first_name, last_name, birth_place, username, password} = req.body

    user_game.update({
        username,
        password
    }, {where : {id}})
    .then(response => {
        user_game_biodata.update({
            first_name,
            last_name,
            birth_place
        }, {where: {user_id: id}})
        .then(response =>{
            res.redirect('/dashboard')
        })
    });
});

//trial points
// routes.get('/points', (req, res) => {
//     const {id} = req.params

//     user_game.findOne({
//         where: {id},
//         include: user_game_history
//     }).then(user => {
//         res.render('gamesuit',{user})
//     })
// })

routes.get("/signup", async (req, res) => {
    return res.render("signup", {
        onSubmit: () => {
            console.log("signup");
        },
    });
});

//belum di link ke database
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
module.exports = routes;