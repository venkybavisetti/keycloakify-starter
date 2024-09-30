import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import React, { useState } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import { colors, TextField, Heading, Text, Button } from "@digitallabs/one-x-ui";
import type { I18n } from "../i18n";
import productLogoHdfcLife from "../../asserts/icons/Product_Logo_HDFC_Life.svg";

const LoginResetPassword:React.FC<PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>>=({kcContext, i18n, doUseDefaultCss, Template, classes}) =>{

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const [isButtondisabled, setIsButtonDisabled] = useState(false);
    const { url, auth, messagesPerField } = kcContext;

    // const { msg, msgStr } = i18n;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode="Login">
            <div className={`bg-[${colors.neutral.white}] rounded-2xl shadow-[0px_20px_32px_0px_#6061701f] gap-8`}>
                <div className="py-[80px] px-[136px]">
                    <div className="gap-5 flex flex-col items-center">
                        <div>
                            <img src={productLogoHdfcLife} alt="productLogoHdfcLife" />
                        </div>
                        <Heading as="h3" fontWeight="semibold">
                            Forgot Your Password
                        </Heading>
                    </div>
                    <div className="gap-6 flex flex-col w-96 m-4">
                        <div className="text-center">
                            <Text  fontWeight="regular" size="xl">
                                Enter your email ID & we will send you instructions to reset your password.
                            </Text>
                        </div>
                        <div id="kc-form">
                            <div id="kc-form-wrapper">
                                <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} onSubmit={() => {
                                            setIsButtonDisabled(true);
                                            return true;
                                        }} method="post">
                                    <div className={kcClsx("kcFormGroupClass")}>
                                        {/* <div className={kcClsx("kcLabelWrapperClass")}>
                                            <label htmlFor="username" className={kcClsx("kcLabelClass")}>
                                                {!realm.loginWithEmailAllowed
                                                    ? msg("username")
                                                    : !realm.registrationEmailAsUsername
                                                      ? msg("usernameOrEmail")
                                                      : msg("email")}
                                                
                                            </label>
                                        </div> */}

                                        <div className={kcClsx("kcInputWrapperClass")}>
                                            {/* <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className={kcClsx("kcInputClass")}
                                                autoFocus
                                                defaultValue={auth.attemptedUsername ?? ""}
                                                aria-invalid={messagesPerField.existsError("username")}
                                            /> */}
                                            <TextField
                                             type="email"
                                                autoFocus
                                                id="username"
                                                defaultValue={auth.attemptedUsername ?? ""}
                                                characterCount=""  
                                                label="Email ID"
                                                variant="outline"
                                            />
                                            {messagesPerField.existsError("username") && (
                                                <span
                                                    id="input-error-username"
                                                    className={kcClsx("kcInputErrorMessageClass")}
                                                    aria-live="polite"
                                                    dangerouslySetInnerHTML={{
                                                        __html: messagesPerField.get("username")
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                        {/* <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                                            <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                                <span>
                                                    <a href={url.loginUrl}>{msg("backToLogin")}</a>
                                                </span>
                                            </div>
                                        </div> */}

                                        <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                            {/* <input
                                                className={kcClsx(
                                                    "kcButtonClass",
                                                    "kcButtonPrimaryClass",
                                                    "kcButtonBlockClass",
                                                    "kcButtonLargeClass"
                                                )}
                                                type="submit"
                                                value={msgStr("doSubmit")}
                                            /> */}
                                            <Button
                                            type="submit"
                                            disabled={isButtondisabled}
                                            className="p-3"
                                            fullWidth={true}
         
                                            color="primary"
                                            onClick={() => setIsButtonDisabled(true)}
                                        >
                                            Continue
                                        </Button>
                                       
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    );
}
export default LoginResetPassword
