import { LanguageButtonContainer, LanguagesContainer } from "./LanguageButton.style";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { toast } from "sonner";
import { Tooltip } from "react-tooltip";

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

    const componentRef = useRef<HTMLDivElement>(null);

    const onClickLanguageChange = (evt: string) => {
        const language = evt;
        i18n.changeLanguage(language);
        toast.success(t("lang_changed"), { duration: 1000 });
        setSelectorState(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!selectorState)
                return;
            if (event.button == 0 && componentRef.current && !componentRef.current.contains(event.target as Node)) {
                setSelectorState(!selectorState);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectorState]);

    return (
        <>
            <LanguageButtonContainer
                src={flags.find(flag => flag.code === i18n.language)?.img}
                alt="Current language"
                onClick={(evt) => setSelectorState(!selectorState)}
                $activategrayscale={1}
                data-tooltip-id={"language-select-btn-tooltip"}
                data-tooltip-content={t("lang_select")} />
            <LanguagesContainer $enabled={selectorState ? 1 : 0} ref={componentRef}>
                {
                    flags.map((flag: any, index: number) => (
                        <LanguageButtonContainer key={index} src={flag.img} onClick={(evt) => { onClickLanguageChange(flag.code); }} />
                    ))
                }
            </LanguagesContainer>
            <Tooltip noArrow={true} place="bottom" id={"language-select-btn-tooltip"} hidden={selectorState} />
        </>
    );
};

export default LanguageButton;