import { createUseI18n } from "keycloakify/login";

export const { useI18n, ofTypeI18n } = createUseI18n({
    en: {
        maxOtps: "You requested the maximum number of messages the last hour",
        loginBtn: "Login",
        forgotBtn: "Forgot Password",
        passwordLabel: "Password",
        userLabel: "User ID or Email",
        resendBtn: "Resend",
        verificationLabel: "Verification code",
        mobileLabel: "Mobile number",
        countryCode: "+91",
        usernameBtn: "Username",
        mobileBtn: "Mobile number",
        backBtn: "back",
        hliTitle: "Sigin using",
    }
});

export type I18n = typeof ofTypeI18n;
