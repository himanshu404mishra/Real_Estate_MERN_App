import { auth } from "express-oauth2-jwt-bearer";

const jwtCheck= auth({
    audience: "https://himanshu404mishra.jp.auth0.com/api/v2/",
    issuerBaseURL:"https://himanshu404mishra.jp.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck