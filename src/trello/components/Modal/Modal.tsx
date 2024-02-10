import { BodyModal, CardModalContainer, CloseButton, FooterModal, HeaderModal } from './Modal.styles';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import React, { useContext, useRef, useState } from 'react';
import { Crosshair, Save, XCircle } from 'react-feather';
import { useTranslation } from "react-i18next";
import { ICard } from '../../models';
import styled from 'styled-components';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';

export enum TrelloModalTypeEnum {
  EDITCARD = 'EDIT_CARD',
  EDITLIST = 'EDIT_LIST',
};


interface TrelloModalProviderType {
  callback: (object: ICard | any) => void;
  currentObject: any;
  toggleModal: (state: boolean) => void;
  animation: AnimationName;
}

export const XCircleStyled = styled(XCircle)<{$$colorl: string, $colord: string}>`
  transition: transform 0.3s ease, color 0.3s ease; // Transition for smooth rotation

  &:hover {
    transform: rotate(90deg);
    color: ${({ $$colorl }) => $$colorl};
  }

  &:active {
    transform: rotate(0deg);
    color: ${({ $colord }) => $colord};
  }
`

export const ModalComponent: React.FC<TrelloModalProviderType> = ({ callback, currentObject, toggleModal, animation }) => {

  const { trelloState } = useContext(trelloCtx);

  const { t } = useTranslation(['home']);

  const [formData, setFormData] = useState<any>(currentObject);
  
  const formRef = useRef<HTMLFormElement>(null);

  const saveModal = (e : React.FormEvent<HTMLFormElement> | null) => {
    if(!!e) e.preventDefault();
    if (callback)
      callback(formData);
    toggleModal(false);
  };

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Actualiza el estado del formulario con el nuevo valor
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <CardModalContainer $bgcolor={trelloState.colors.bgColorFromLsD} $animation={animation} $xorigin='0%' $yorigin='-150%' $xtarget='0%' $ytarget='0%'>
        <HeaderModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <h1>Edit Card</h1>
        </HeaderModal>

        <CloseButton onClick={() => toggleModal(false)}>
          <XCircleStyled size={30} $$colorl={trelloState.colors.bgColorFromLsD} $colord={trelloState.colors.bgColorFromLsN}/>
        </CloseButton>

        <BodyModal onSubmit={saveModal} ref={formRef} $bgcolor={trelloState.colors.bgColorFromLsL}>
          {
            Object.keys(formData).map((o, i) => (
              <div key={o + "-" + i}>
                <label htmlFor={o}>{t(o)}</label>
                <input
                  id={o + "-" + i}
                  name={o}
                  type="text"
                  defaultValue={formData[o]}
                  onChange={updateValue}
                  style={{ borderRadius: 5, height: 25, borderWidth: 1, marginTop: 5 }}
                  required
                />
              </div>
            ))
          }
        </BodyModal>

        <FooterModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <button onClick={() => {saveModal(null)}}>
            <Save></Save>
          </button>
        </FooterModal>
      </CardModalContainer>
    </>
  );
};

