const validateEnvVar = (name: string, value: string | undefined): string => {
    if (!value) {
        throw new Error(`${name} is not defined in environment variables`);
    }
    return value;
};

export default{
    port: process.env.PORT || 3000,
    allowed_origins: process.env.ALLOWED_ORIGINS || "*",
    rate_limit_window_minutes: ()=>{
        if(!process.env.RATE_LIMIT_WINDOW_MINUTES){
            return 15;
        }
        return parseInt(process.env.RATE_LIMIT_WINDOW_MINUTES)
    },
    rate_limit_max_request: ()=>{
        if(!process.env.RATE_LIMIT_MAX_REQUESTS){
            return 100;
        }
        return parseInt(process.env.RATE_LIMIT_MAX_REQUESTS)
    },
    JWT_SECRET: validateEnvVar('JWT_SECRET', process.env.JWT_SECRET),
    SALTING: validateEnvVar('SALTING', process.env.SALTING),
    API_URL: validateEnvVar('API_URL', process.env.API_URL),
    EMAIL_ID: validateEnvVar('EMAIL_ID', process.env.EMAIL_ID),
    EMAIL_PASS: validateEnvVar('EMAIL_PASS', process.env.EMAIL_PASS),
    EMAIL_SERVICES: validateEnvVar('EMAIL_SERVICES', process.env.EMAIL_SERVICES)

}