export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",
    JWT_SECRET: ()=>{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        return process.env.JWT_SECRET;
    },
    SALTING: ()=>{
        if (!process.env.SALTING) {
            throw new Error("SALTING is not defined in environment variables");
        }
        return process.env.SALTING;
    },
    API_URL:()=>{
        if (!process.env.API_URL) {
            throw new Error("API_URL is not defined in environment variables");
        }
        return process.env.API_URL;
    }
}