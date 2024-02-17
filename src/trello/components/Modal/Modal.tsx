import { BodyModalElementContainer, BodyModalForm, CardModalContainer, CloseButton, FooterModal, HeaderModal, ModalBackground } from './Modal.styles';
import trelloCtx from '../../providers/TrelloContextProvider/TrelloContextProvider';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Delete, Save, XCircle } from 'react-feather';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useTranslation } from "react-i18next";
import { ICard } from '../../models';
import styled from 'styled-components';
import { AnimationName } from '../../../utils/components/globalAnimationsComponent/globalAnimationsComponent';
import { quilFormats, quilModules, reactQuillStyles } from '../../../utils/components/globalUtils/globalutils';
import { ConfirmComponent } from '../Confirm/Confirm';
import { createPortal } from 'react-dom';

export enum TrelloModalTypeEnum {
  EDITCARD = 'EDIT_CARD',
  EDITLIST = 'EDIT_LIST',
};

export type IFormValue = {
  name: string,
  iname: string,
  type: string,
  defaultValue: string
}

export type IFormTemplate = {
  values: IFormValue[]
}

interface TrelloModalProviderType {
  callback: (object: ICard | any) => void;
  deleteCallback: () => void;
  currentObject: any;
  templateObject: IFormTemplate;
  toggleModal: (state: boolean) => void;
  animation: AnimationName;
}

export const XCircleStyled = styled(XCircle) <{ $colorl: string, $colord: string }>`
  transition: transform 0.3s ease, color 0.3s ease; // Transition for smooth rotation

  &:hover {
    transform: rotate(90deg);
    color: ${({ $colorl }) => $colorl};
  }

  &:active {
    transform: rotate(0deg);
    color: ${({ $colord }) => $colord};
  }
`

export const ModalComponent: React.FC<TrelloModalProviderType> = ({ callback, deleteCallback, currentObject, templateObject, toggleModal, animation }) => {

  const componentRef = useRef<HTMLDivElement>(null);

  
  const { trelloState } = useContext(trelloCtx);
  
  const { t } = useTranslation(['home']);

  const [quilModule] = useState(quilModules);
  
  const [quilFormat] = useState(quilFormats);
  
  const [formData, setFormData] = useState<any>(currentObject);
  
  const [formTemplate, setFormTemplate] = useState<IFormTemplate>(templateObject);
  
  const formRef = useRef<HTMLFormElement>(null);
  
  const [backgroundAnimation, setBackgroundAnimation] = useState<AnimationName>("fadeInBackground");
  
  const [modalDeleteAnimation, setModalDeleteAnimation] = useState<AnimationName>("none");

  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  const deleteModalCallback = (state: boolean) => {
    setModalDeleteAnimation(state ? 'appear' : 'disappear');
    setTimeout(() => {
      if (state)
        deleteCallback();
      setDeleteConfirmModal(false);
    }, 1000);
  };

  const saveModal = (e: React.FormEvent<HTMLFormElement> | null) => {
    if (!!e) e.preventDefault();
    if (callback)
      callback(formData);
    changeModalDisplay(false);
  };

  const updateValue = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    // Actualiza el estado del formulario con el nuevo valor
    setFormData({ ...formData, [name]: value });
  };

  const updateRichTextValue = (value: string, name: string) => {
    // Actualiza el estado del formulario con el nuevo valor
    setFormData({ ...formData, [name]: value });
  };

  const changeModalDisplay = (state: boolean) => {
    setBackgroundAnimation(state ? 'fadeInBackground' : 'fadeOutBackground');
    toggleModal(state);
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (event.button == 0 && componentRef.current && !componentRef.current.contains(event.target as Node))
      changeModalDisplay(false);
  };

  useEffect(() => {
    if(!deleteConfirmModal)
      document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [toggleModal, deleteConfirmModal]);

  return (
    <ModalBackground $animation={backgroundAnimation}>
      <CardModalContainer ref={componentRef} $bgcolor={trelloState.colors.bgColorFromLsD} $animation={animation} $xorigin='0%' $yorigin='-150%' $xtarget='0%' $ytarget='0%'>
        <HeaderModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <h1>Edit Card</h1>
        </HeaderModal>

        <CloseButton onClick={() => changeModalDisplay(false)}>
          <XCircleStyled size={30} $colorl={trelloState.colors.bgColorFromLsD} $colord={trelloState.colors.bgColorFromLsN} />
        </CloseButton>

        <BodyModalForm onSubmit={saveModal} ref={formRef} $bgcolor={trelloState.colors.bgColorFromLsL}>
          {
            formTemplate.values.map((o, i) => (
              <BodyModalElementContainer key={o.name + "-" + i} >
                <label htmlFor={o.name}>{t(o.iname)}</label>
                {
                  {
                    'text':
                      <input
                        id={o.name + "-" + i}
                        name={o.name}
                        type={o.type}
                        defaultValue={formData[o.name]}
                        onChange={updateValue}
                        style={{ borderRadius: 5, height: 25, borderWidth: "1px 1px 2px", marginTop: 5 }}
                        required
                      />,
                    'textarea':
                      <>
                        <style>{reactQuillStyles}</style>
                        <ReactQuill id={o.name + "-" + i}
                          theme='snow'
                          modules={quilModule}
                          formats={quilFormat}
                          value={formData[o.name]}
                          onChange={(e) => { updateRichTextValue(e, o.name) }}
                          style={{ borderRadius: 5, height: 50, marginTop: 5, minHeight: "100px", backgroundColor: trelloState.colors.bgColorFromLsL }} />
                      </>
                  }[o.type]
                }
              </BodyModalElementContainer>
            ))
          }
        </BodyModalForm>

        <FooterModal $bgcolor={trelloState.colors.bgColorFromLsL}>
          <button onClick={() => { saveModal(null) }}>
            <Save></Save>
          </button>
          {
            !!deleteCallback &&
            <button onClick={() => {
              setModalDeleteAnimation('appear');
              setDeleteConfirmModal(true);
            }}>
              <Delete></Delete>
            </button>
          }

          {
            deleteConfirmModal && createPortal(<ConfirmComponent animation={modalDeleteAnimation} title='delete' text='deleteCard' callback={deleteModalCallback} />,
              document.getElementById("modal-root") as HTMLElement)
          }

        </FooterModal>
      </CardModalContainer>
    </ModalBackground >
  );
};

