const jwt = require('jsonwebtoken');
const JWT_SECRET = "Shakthiissecret"


const fetchuser = (req, res, next)=>{
    //Get the user from the jwt token and add the id to req object
    const token = req.header('auth-token')
    if(!token){
        return res.status(401).send({error: "Please authenticate with valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET) // console.log(data)
        req.user = data.user;
        next() 
    } catch (error) {
        return res.status(401).send({error: "Provide a valid token"})
    }
    
}

module.exports = fetchuser;