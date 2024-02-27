import jwt from 'jsonwebtoken'

const generateTokenSetCookie =(userId,res)=>{
    const secretKey = '0hpn4YPOhqa1XNmfYdf8bzfkaTfmU8gQqyksTpNxp8I=';
    const token = jwt.sign({userId},secretKey,{
        expiresIn: '15d'
    })
    res.cookie("jwt",token,{
        maxAge: 15*24*60*60*1000, //MS
        httpOnly: true,//prevnt cross scripting attacks (XSS)
        sameSite:"strict", // CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !=="development",
    })
}

export default generateTokenSetCookie;