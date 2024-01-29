import { LanguageButtonContainer, LanguagesContainer } from "./LanguageButton.style";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import React from "react";
import { toast } from "sonner";

const flags = [
    {
        code: "en",
        img: "/img/englishFlag.png"
    }, {
        code: "es",
        img: "/img/spanishFlag.png"
    }, {
        code: "fr",
        img: "/img/frenchFlag.png"
    },
]

const LanguageButton = () => {

    const { i18n, t } = useTranslation(['home']);

    const [selectorState, setSelectorState] = useState(false);

    const onClickLanguageChange = (evt: string) => {
        const language = evt;
        i18n.changeLanguage(language);
        toast.success(t("lang_changed"), {duration: 1000});
        setSelectorState(false);
    }

    return (
        <>
            <LanguageButtonContainer 
                src={flags.find(flag => flag.code === i18n.language)?.img} 
                alt="Current language"
                onClick={(evt) => setSelectorState(!selectorState)} 
                activateGrayscale={true}/>
            <LanguagesContainer enabled={selectorState}>
                {
                    flags.map((flag: any, index: number) => (
                        <LanguageButtonContainer key={index} src={flag.img} onClick={(evt) => { onClickLanguageChange(flag.code); }} />
                    ))
                }
            </LanguagesContainer>
        </>
    );
};

export default LanguageButton;