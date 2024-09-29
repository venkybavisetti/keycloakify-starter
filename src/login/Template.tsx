import { useEffect } from "react";
import type { TemplateProps } from "keycloakify/login/TemplateProps";
import { useStylesAndScripts } from "keycloakify/login/Template.useStylesAndScripts";
import type { I18n } from "./i18n";
import type { KcContext } from "./KcContext";
import "@digitallabs/one-x-ui/styles.css";
import "../styles/tailwind.css";
import hdfcInspireLogo from "../asserts/icons/HDFCLife_Inspire_Logo.svg";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { documentTitle, kcContext, i18n, doUseDefaultCss, children } = props;
    const { msgStr } = i18n;

    useEffect(() => {
        document.title = documentTitle ?? msgStr("loginTitle", kcContext.realm.displayName);
    }, [documentTitle, kcContext.realm.displayName, msgStr]);

    const { isReadyToRender } = useStylesAndScripts({ kcContext, doUseDefaultCss });

    if (!isReadyToRender) {
        return null;
    }

    return (
        <div className="bg-[#F0F6FE] flex flex-col min-h-screen justify-center">
            <div className="pt-4 pl-4 sm:pt-8 md:pt-[80px]  sm:pl-8 md:pl-[80px] flex justify-center lg:justify-start">
                <img className="w-[152px] lg:w-[174px]" src={hdfcInspireLogo} alt="HDFCLife Inspire Logo" />
            </div>
            <div className="flex lg:items-center mt-4 lg:mt-0 justify-center flex-1">
                {children}
            </div>
        </div>
    );
}
