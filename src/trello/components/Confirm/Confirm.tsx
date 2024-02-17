import { BodyModalForm, CardModalContainer, ConfirmBackground, FooterModal, HeaderModal } from './Confirm.styles';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import React, { useContext, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from "react-i18next";
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';
import { Delete } from 'react-feather';


interface TrelloModalProviderType {
  callback: (state: boolean) => void;
  title: string;
  text: string;
  animation: AnimationName;
}

export const ConfirmComponent: React.FC<TrelloModalProviderType> = ({ callback, title, text, animation }) => {

  const componentRef = useRef<HTMLDivElement>(null);

  const { trelloState } = useContext(trelloCtx);

  const { t } = useTranslation(['home']);

  const formRef = useRef<HTMLFormElement>(null);

  const [backgroundAnimation, setBackgroundAnimation] = useState<AnimationName>("fadeInBackground")

  const invokeCallback = (state: boolean) => {
    setBackgroundAnimation("fadeOutBackground");
    callback(state);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.button == 0 &&
        componentRef.current &&
        !componentRef.current.contains(event.target as Node))
        invokeCallback(false);
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return (
    <ConfirmBackground $animation={backgroundAnimation}>
      <CardModalContainer ref={componentRef} $bgcolor={trelloState.colors.bgColorFromLsD} $animation={animation} $xorigin='0%' $yorigin='-150%' $xtarget='0%' $ytarget='0%'>
        <HeaderModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <h1>{t(title)}</h1>
        </HeaderModal>

        <BodyModalForm $bgcolor={trelloState.colors.bgColorFromLsL}>
          {t(text)}
        </BodyModalForm>

        <FooterModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <button onClick={() => { invokeCallback(true) }}>
            <Delete></Delete>
          </button>
        </FooterModal>
      </CardModalContainer>
    </ConfirmBackground >
  );
};

