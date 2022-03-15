declare namespace NodeJS {
    export interface ProcessEnv {
        KEYCLOAK_ID: "next-auth-test"
        // KEYCLOAK_SECRET: ""
        KEYCLOAK_ISSUER: "http://localhost:8080/auth/realms/test-kc-realm"
        KEYCLOAK_BASE_URL: "http://localhost:8080/"

    }
}