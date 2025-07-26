export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",
    JWT_SECRET: process.env.JWT_SECRET!,
    SALTING: process.env.SALTING!,
    API_URL: process.env.API_URL!
}