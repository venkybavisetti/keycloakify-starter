import React, { useEffect, useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import axios from "axios";
import { Button, Text, Heading, colors, TextField } from "@digitallabs/one-x-ui";
import { ArrowLeft, EyeSlash } from "@phosphor-icons/react";
import productLogoHdfcLife from "../../asserts/icons/Product_Logo_HDFC_Life.svg";

const Login: React.FC<PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>> = ({ kcContext, i18n, doUseDefaultCss, Template, classes }) => {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const {
        realm,
        url,
        usernameHidden,
        //  login,
        messagesPerField
    } = kcContext;
    // const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [phoneActivated, setPhoneActivated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isDisabledSendCode, setIsDisabledSendCode] = useState(false);
    const [hasLoginHint, setHasLoginHint] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const hint = urlParams.get("login_hint");

        if (!hint) {
            return setHasLoginHint(false);
        }
        setHasLoginHint(true);
        const phoneRegex = /^[6-9]\d{9}$/;

        if (phoneRegex.test(hint)) {
            setPhoneNumber(hint);
            setPhoneActivated(true);
            handleSendVerificationCode(hint);
        } else {
            setEmail(hint);
            setPhoneActivated(false);
        }
    }, []);

    const handleSendVerificationCode = async (phoneNo?: string) => {
        const sendOtpPhoneNumber = `+91${phoneNo ?? phoneNumber}`;
        try {
            setIsDisabledSendCode(true);
            const params = { params: { phoneNumber: sendOtpPhoneNumber } };
            const response = await axios.get(`http://localhost:8001/realms/${realm.name}/sms/authentication-code`, params);
            const expiresIn = response.data.expires_in;

            //   const expiresIn = 1;
            if (expiresIn) {
                setTimeout(() => setIsDisabledSendCode(false), expiresIn * 1000);
            } else {
                setIsDisabledSendCode(false);
            }
        } catch (error) {
            console.error("Error sending verification code", error);
            setIsDisabledSendCode(false);
        }
    };

    const handleBackNavigation = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const loginHint = urlParams.get("login_hint");
        const siginUrl = urlParams.get("sigin_uri");

        if (siginUrl && loginHint) {
            const backNavigationUrl = `${siginUrl}?login_hint=${loginHint}`;
            window.location.href = backNavigationUrl;
        }
    };

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode="Login">
            <div>
                <div className="absolute flex pt-6 pl-4 items-center gap-1">
                    <Button onClick={handleBackNavigation} variant="link" color="gray" size="sm" startIcon={<ArrowLeft size={20} />}>
                        Back
                    </Button>
                </div>
                <div className="bg-white lg:rounded-2xl md:rounded-2xl shadow-[0px_20px_32px_0px_#6061701f] gap-8 lg:w-[680px] mx-auto p-4 sm:p-0 md:p-[80px]">
                    <div className="flex flex-col gap-8">
                        <div className="gap-5 flex flex-col items-center">
                            <div>
                                <img src={productLogoHdfcLife} alt="productLogoHdfcLife" className="w-24 md:w-32" />
                            </div>
                            <Heading as="h3" fontWeight="semibold" className="text-center text-lg md:text-xl">
                                Sigin using
                            </Heading>
                        </div>
                        <div className="gap-6 flex flex-col">
                            {!hasLoginHint && (
                                <div className="flex justify-center">
                                    <div className="bg-[#FEF2F1] rounded-full max-w-fit">
                                        {phoneActivated ? (
                                            <>
                                                <Button
                                                    className="rounded-full p-3"
                                                    variant="primary"
                                                    color="primary"
                                                    onClick={() => setPhoneActivated(true)}
                                                >
                                                    Mobile number
                                                </Button>
                                                <Button
                                                    className="rounded-full p-3"
                                                    variant="link"
                                                    color="gray"
                                                    onClick={() => setPhoneActivated(false)}
                                                >
                                                    Username
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button
                                                    className="rounded-full p-3"
                                                    variant="link"
                                                    color="gray"
                                                    onClick={() => setPhoneActivated(true)}
                                                >
                                                    Mobile number
                                                </Button>
                                                <Button
                                                    className="rounded-full p-3"
                                                    variant="primary"
                                                    color="primary"
                                                    onClick={() => setPhoneActivated(false)}
                                                >
                                                    Username
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}

                            {realm.password && (
                                <form
                                    id="kc-form-login"
                                    onSubmit={() => {
                                        setIsLoginButtonDisabled(true);
                                        return true;
                                    }}
                                    action={url.loginAction}
                                    method="post"
                                    className="flex flex-col gap-8"
                                >
                                    <input type="hidden" id="phoneActivated" name="phoneActivated" value={phoneActivated.toString()} />
                                    <input type="hidden" id="phoneNumber" name="phoneNumber" value={`+91${phoneNumber}`} />
                                    {phoneActivated ? (
                                        <div className="flex flex-col gap-6">
                                            {!hasLoginHint ? (
                                                <div>
                                                    <TextField
                                                        tabIndex={0}
                                                        id="phoneNumber"
                                                        name="phoneNumber"
                                                        value={phoneNumber}
                                                        label="Mobile number"
                                                        variant="outline"
                                                        onChange={e => setPhoneNumber(e.target.value)}
                                                        type="text"
                                                        aria-invalid={phoneNumber ? "false" : "true"}
                                                        autoFocus
                                                        size="lg"
                                                        leftSection={
                                                            <div style={{ color: colors.neutral.grey[900] }}>
                                                                <Text fontWeight="medium" size="md">
                                                                    +91
                                                                </Text>
                                                            </div>
                                                        }
                                                    />
                                                    {messagesPerField.existsError("code") ||
                                                        (messagesPerField.existsError("phoneNumber") && (
                                                            <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                                                                {messagesPerField.getFirstError("phoneNumber", "code")}
                                                            </span>
                                                        ))}
                                                </div>
                                            ):<Heading as="h4" fontWeight="bold">{`+91 ${phoneNumber}`}</Heading>}

                                            <div className="flex items-end gap-4">
                                                <div className="flex-1">
                                                    <TextField
                                                        tabIndex={0}
                                                        type="password"
                                                        id="code"
                                                        name="code"
                                                        value={verificationCode}
                                                        onChange={e => setVerificationCode(e.target.value)}
                                                        autoComplete="off"
                                                        label="Verification code"
                                                        variant="outline"
                                                        autoFocus
                                                        size="lg"
                                                        rightSection={<EyeSlash size={32} />}
                                                        aria-invalid={
                                                            messagesPerField.existsError("code") || messagesPerField.existsError("phoneNumber")
                                                                ? "true"
                                                                : "false"
                                                        }
                                                    />
                                                    {messagesPerField.existsError("code") && (
                                                        <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                                                            {messagesPerField.getFirstError("code", "phoneNumber")}
                                                        </span>
                                                    )}
                                                </div>

                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleSendVerificationCode()}
                                                    disabled={isDisabledSendCode}
                                                    size="lg"
                                                >
                                                    Resend
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-6">
                                                {!hasLoginHint ? (
                                                    <div>
                                                        <TextField
                                                            value={email}
                                                            onChange={event => setEmail(event.target.value)}
                                                            label="User ID or Email"
                                                            variant="outline"
                                                            size="lg"
                                                            tabIndex={2}
                                                            id="username"
                                                            name="username"
                                                            // defaultValue={login.username ?? ""}
                                                            type="text"
                                                            autoFocus
                                                            autoComplete="username"
                                                            aria-invalid={messagesPerField.existsError("username", "password")}
                                                        />
                                                        {messagesPerField.existsError("username", "password") && (
                                                            <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite">
                                                                {messagesPerField.getFirstError("username", "password")}
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Heading as="h4" fontWeight="bold">
                                                            {email}
                                                        </Heading>
                                                        <input type="hidden" id="username" name="username" value={email} />
                                                    </>
                                                )}

                                                <div>
                                                    <TextField
                                                        tabIndex={3}
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                                        label="Password"
                                                        variant="outline"
                                                        autoFocus
                                                        size="lg"
                                                        rightSection={<EyeSlash size={32} />}
                                                    />
                                                    {usernameHidden && messagesPerField.existsError("username", "password") && (
                                                        <span id="input-error" className={kcClsx("kcInputErrorMessageClass")} aria-live="polite" />
                                                    )}
                                                </div>
                                            </div>
                                            {!phoneActivated && (
                                                <div className="flex justify-end mt-1">
                                                    <Button variant="link" color="gray" size="md">
                                                        Forgot Password
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <Button
                                        id="kc-login"
                                        className="max-w-full w-full mt-4"
                                        name="login"
                                        color="primary"
                                        size="lg"
                                        variant="primary"
                                        type="submit"
                                        disabled={isLoginButtonDisabled}
                                    >
                                        Login
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
};

export default Login;
