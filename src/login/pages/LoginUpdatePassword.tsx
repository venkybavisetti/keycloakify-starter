import { useEffect, useReducer } from "react";
import { assert } from "keycloakify/tools/assert";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { colors, TextField, Heading, Text, Button } from "@digitallabs/one-x-ui";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import productLogoHdfcLife from "../../asserts/images/Product_Logo_HDFC_Life.svg";

const LoginUpdatePassword: React.FC<PageProps<Extract<KcContext, { pageId: "login-update-password.ftl" }>, I18n>> = ({
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    classes
}) => {
    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { msg, msgStr } = i18n;

    const { url, messagesPerField, isAppInitiatedAction } = kcContext;

    return (
        <Template kcContext={kcContext} i18n={i18n} doUseDefaultCss={doUseDefaultCss} classes={classes} headerNode="Login">
            <div
                style={{ color: colors.neutral.white }}
                className={`flex flex-col w-[680px] py-[80px] px-[136px] rounded-2xl shadow-[0px_20px_32px_0px_#6061701f] gap-8 `}
            >
                <div className="gap-5 flex flex-col items-center">
                    <div>
                        <img src={productLogoHdfcLife} alt="productLogoHdfcLife" />
                    </div>
                    <Heading as="h3" fontWeight="semibold">
                        Create a New Password
                    </Heading>
                </div>
                <div className="gap-6 flex flex-col">
                    {/* <div id="kc-form">
                        <div id="kc-form-wrapper"> */}

                    <form
                        id="kc-passwd-update-form"
                        className={kcClsx("kcFormClass")}
                       // action={url.loginAction}
                        method="post"
                        onSubmit={event => {
                            event.preventDefault(); 
                       
                            const form = event.target as HTMLFormElement;
                            const formData = new FormData(form);
                            console.log(formData,"formData");

                            const formObject = Object.fromEntries(formData.entries());
                            console.log(formObject,"formObject");

                            // const oldPassword = form["password-new"].value; // Access input name
                            // const newPassword =form["password-confirm"].value;  // Access input name
                           // console.log({ oldPassword, newPassword });
                        
                        }}
                    >
                        <div className={kcClsx("kcFormGroupClass")}>
                            {/* <div className={kcClsx("kcLabelWrapperClass")}>
                                            <label htmlFor="password-new" className={kcClsx("kcLabelClass")}>
                                                {msg("passwordNew")}
                                            </label>
                                        </div> */}
                            <div className={kcClsx("kcInputWrapperClass")}>
                                {/* <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-new">
                                              
                                            </PasswordWrapper> */}

                                <TextField type="password" autoFocus id="password-new" label="New Password" variant="outline" />

                                {messagesPerField.existsError("password") && (
                                    <span
                                        id="input-error-password"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.get("password")
                                        }}
                                    />
                                )}
                            </div>
                        </div>

                        <div className={kcClsx("kcFormGroupClass")}>
                            {/* <div className={kcClsx("kcLabelWrapperClass")}>
                                            <label htmlFor="password-confirm" className={kcClsx("kcLabelClass")}>
                                                {msg("passwordConfirm")}
                                            </label>
                                        </div> */}
                            <div className={kcClsx("kcInputWrapperClass")}>
                                {/* <PasswordWrapper kcClsx={kcClsx} i18n={i18n} passwordInputId="password-confirm">
                                               
                                            </PasswordWrapper> */}
                                {/* <input
                                                type="password"
                                                id="password-confirm"
                                                name="password-confirm"
                                                className={kcClsx("kcInputClass")}
                                                autoFocus
                                                autoComplete="new-password"
                                                aria-invalid={messagesPerField.existsError("password", "password-confirm")}
                                            /> */}
                                <TextField type="password" id="password-confirm" label="Confirm Password" variant="outline" />

                                {messagesPerField.existsError("password-confirm") && (
                                    <span
                                        id="input-error-password-confirm"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: messagesPerField.get("password-confirm")
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                            <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                                <Button
                                    type="submit"
                                    // disabled={isButtondisabled}
                                    fullWidth={true}
                                    color="primary"
                                    className="p-3"
                                    // onClick={toggleIsPasswordRevealed}
                                >
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </form>
                    {/* </div>
                    </div> */}
                </div>
            </div>
        </Template>
    );
};

// function LogoutOtherSessions(props: { kcClsx: KcClsx; i18n: I18n }) {
//     const { kcClsx, i18n } = props;

//     const { msg } = i18n;

//     return (
//         <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
//             <div className={kcClsx("kcFormOptionsWrapperClass")}>
//                 <div className="checkbox">
//                     <label>
//                         <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" defaultChecked={true} />
//                         {msg("logoutOtherSessions")}
//                     </label>
//                 </div>
//             </div>
//         </div>
//     );
// }

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            {/* <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button> */}

            <Button
                type="button"
                // disabled={isButtondisabled}
                fullWidth={true}
                color="primary"
                onClick={toggleIsPasswordRevealed}
            >
                Continue
            </Button>
        </div>
    );
}
export default LoginUpdatePassword;
