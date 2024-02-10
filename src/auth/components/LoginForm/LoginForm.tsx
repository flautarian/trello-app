import { Dispatch, FormEventHandler, SetStateAction } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { ElementContainer, LabelElement, LoginFormContainer, RegisterButton, RegisterContainer, SubmitButton, Title } from "./LoginForm.styles";
import { useTranslation } from "react-i18next";
import { AnimationName } from "../../../utils/components/globalAnimationsComponent/globalAnimationsComponent";
import LanguageButton from '../../../utils/components/LanguageButton/LanguageButton';
import { LanguageContainer } from "../../../utils/components/LanguageButton/LanguageButton.style";
import { UserPlus } from "react-feather";
import { LoginState } from "../../../utils/components/globalUtils/globalutils";
import { Tooltip } from "react-tooltip";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  setIsLogin: Dispatch<SetStateAction<LoginState>>;
  animation: AnimationName
};

const LoginForm = (props: Props) => {

  const { onSubmit } = props;

  const { t } = useTranslation(['home']);

  return (
    <LoginFormContainer 
      onSubmit={onSubmit} 
      $animation={props.animation}
      $xorigin='-50%' 
      $yorigin='-20%' 
      $xtarget='-50%' 
      $ytarget='-50%'>
      <Title className="poppins-medium">My FG TrelloApp</Title>
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
      <ElementContainer>
        <LabelElement htmlFor="password">{t("password")}</LabelElement>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
          style={{borderRadius: 5, height: 25, borderWidth: 1, marginTop: 5}}
        />
      </ElementContainer>
      <SubmitButton type="submit">{t("submit")}</SubmitButton>
      <RegisterContainer>
        <RegisterButton 
          onClick={() => {props.setIsLogin(LoginState.REGISTER)}}
          data-tooltip-id={"login-register-btn-tooltip"}
          data-tooltip-content={t("register")}>
            <UserPlus size={30}></UserPlus>
        </RegisterButton>
        <Tooltip noArrow={true} place="bottom" id={"login-register-btn-tooltip"} />
        <LanguageContainer>
          <LanguageButton />
        </LanguageContainer>
      </RegisterContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;