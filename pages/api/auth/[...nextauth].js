import NextAuth from "next-auth"
import KeycloakProvider from "next-auth/providers/keycloak";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
        clientId: process.env.KEYCLOAK_ID,
        // clientSecret: process.env.KEYCLOAK_SECRET,
        issuer: process.env.KEYCLOAK_ISSUER,
        baseUrl: process.env.KEYCLOAK_BASE_URL,
        // "auth-server-url": 'http://localhost:8080/auth/',
        // "realm": "http://localhost:8080/auth/realms/test-kc-realm",
        // "clientId": "react-auth-test",
        // "issuer": "http://localhost:8080/auth/realms/test-kc-realm",
        // "clientSecret": "MIICqzCCAZMCBgF/jSyYSTANBgkqhkiG9w0BAQsFADAZMRcwFQYDVQQDDA5uZXh0LWF1dGgtdGVzdDAeFw0yMjAzMTUxMDQxMjRaFw0zMjAzMTUxMDQzMDRaMBkxFzAVBgNVBAMMDm5leHQtYXV0aC10ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAw+mgAytUG+9O54ib2N0xjoqjfozhAKNZwQdpBx+1BTdiRFeI5HP4GmHCvAQCYc4C0PRKb8cJ98gHs7cKUYlxAhZ1Qf6ALQrndebbrWjeIsiX9U3y8fmsdHyo2tBvEJnInxTKpeoxoqHsgC0z3AHEiyWJ6xz8393tSBXaqNTQJtB+Z+Go3Qavskh49/mFRRYgWt3ohsu4EcN2Kc7r+T+TeerpahAX4koPYgr+nTSkzufMh98kTrqUGl2/UVKMnvBDeXW3MrNuyE3FxszozHYv0YmU9SlFzPc0SFaA5A/V8+MoUkdhnk24vCrClBytEO9OhyeCl2B3+aFY+6RHeXCYrQIDAQABMA0GCSqGSIb3DQEBCwUAA4IBAQBRfdAKIrVuTEPnFO+IPjEjao07DtjtPZ7UJIsg4Xzr/NYW/TOXR3xN4QyxtfAoRrTHoz9VMVAnlhrOo6PeYnq0TE/YVROVFmJlo4C3qkeejX1gb/NQBvL+3bdWeWEL8jtKNmu4WHHtUcK3JQSoFcfK8bgh7VqEGLcX3QZ81G2QQOo46q3bpIvQmImIkcfwxrl6dHanQJjIGUoCrRm0XSy/og16FsYmOgiuOzCdznrVsIdFWWIhISq5hWlZXrm7VkXwKuYIH6/LfDkjj1Jl8sqS10llqwx1C9OBpsMPbbk8yJVrqZLLJ7t7g/1l26XC2ghZGOCsYWG5x6Z5Ha9oAKqj"

    })
    // ...add more providers here
  ],
})