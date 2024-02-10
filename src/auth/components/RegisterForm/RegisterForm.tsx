import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { ElementContainer, LabelElement, RegisterButton, RegisterContainer, RegisterFormContainer, SubmitButton, Title } from "./RegisterForm.styles";
import { AnimationName } from "../../../utils/components/globalAnimationsComponent/globalAnimationsComponent";
import { ArrowLeft } from "react-feather";
import { LanguageContainer } from "../../../utils/components/LanguageButton/LanguageButton.style";
import LanguageButton from "../../../utils/components/LanguageButton/LanguageButton";
import { useTranslation } from "react-i18next";
import { LoginState } from "../../../utils/components/globalUtils/globalutils";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  setIsLogin: Dispatch<SetStateAction<LoginState>>;
  animation: AnimationName;
};

const RegisterForm = (props: Props) => {


  const { onSubmit } = props;

  const { t } = useTranslation(['home']);

  return (
    <RegisterFormContainer 
      onSubmit={onSubmit} 
      $animation={props.animation}
      $xorigin='-50%' 
      $yorigin='-20%' 
      $xtarget='-50%' 
      $ytarget='-50%'>
      <Title className="poppins-medium" style={{marginTop: 25}}>{t("register")}</Title>
      <ElementContainer>
        <LabelElement htmlFor="name">{t("username")}</LabelElement>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Full Name"
          style={{borderRadius: 5, height: 25, borderWidth: 1, marginTop: 5}}
        />
      </ElementContainer>
      <ElementContainer>
        <LabelElement htmlFor="email">{t("email")}</LabelElement>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
          style={{borderRadius: 5, height: 25, borderWidth: 1, marginTop: 5}}
        />
      </ElementContainer>
      <div>
        <label htmlFor="password">{t("password")}</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          style={{borderRadius: 5, height: 25, borderWidth: 1, marginTop: 5}}
        />
      </div>
      <SubmitButton type="submit">{t("submit")}</SubmitButton>
      <RegisterContainer>
        <RegisterButton onClick={() => {props.setIsLogin(LoginState.LOG_IN)}}>
            <ArrowLeft size={28}></ArrowLeft>
        </RegisterButton>
        <LanguageContainer>
          <LanguageButton />
        </LanguageContainer>
      </RegisterContainer>
    </RegisterFormContainer>
  );
};

export default RegisterForm;