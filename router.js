import express from "express";

const router = express.Router();

//http://localhost:3300/trial
router.use((req, res, next)=>{
    const email = req.query.email;
    
    if (email != undefined){
        next ();
        return;
    }
    res.send("Memerlukan E-mail");
});

//http://localhost:3300/auth/login?angka=1&&email=qwe@mail.com
router.get("/login", (req, res) => {
    console.log("Ini halaman login");
    res.send("./login.html");
});

export default router;