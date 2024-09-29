import React, { useState } from "react";
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

    const { realm, url, usernameHidden, login, messagesPerField } = kcContext;
    // const { msg } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
    const [phoneActivated, setPhoneActivated] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [sendButtonText, setSendButtonText] = useState("Send Code");

    const handleSendVerificationCode = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        try {
            setSendButtonText("Resend code");
            const params = { params: { phoneNumber: `+91${phoneNumber}` } };
            const response = await axios.get(`http://localhost:8001/realms/${realm.name}/sms/authentication-code`, params);

            const expiresIn = response.data.expires_in;
            if (expiresIn) {
                setTimeout(() => setSendButtonText("Send Code"), expiresIn * 1000);
            } else {
                setSendButtonText("Send Code");
            }
        } catch (error) {
            console.error("Error sending verification code", error);
            setSendButtonText("Send Code");
        }
    };

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode="Login">
            <div>
                <div className="absolute flex pt-6 pl-4 items-center gap-1">
                    <Button variant="link" color="gray" size="sm" startIcon={<ArrowLeft size={20} />}>
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
                                Login using
                            </Heading>
                        </div>
                        <div className="gap-6 flex flex-col">
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
                                            <Button className="rounded-full p-3" variant="link" color="gray" onClick={() => setPhoneActivated(false)}>
                                                Username
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="rounded-full p-3" variant="link" color="gray" onClick={() => setPhoneActivated(true)}>
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

                                    {phoneActivated ? (
                                        <div className="flex flex-col gap-6">
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
                                                    onClick={handleSendVerificationCode}
                                                    disabled={sendButtonText !== "Send Code"}
                                                    size="lg"
                                                >
                                                    {sendButtonText}
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-6">
                                                {!usernameHidden && (
                                                    <div>
                                                        <TextField
                                                            label="User ID or Email"
                                                            variant="outline"
                                                            size="lg"
                                                            tabIndex={2}
                                                            id="username"
                                                            name="username"
                                                            defaultValue={login.username ?? ""}
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
