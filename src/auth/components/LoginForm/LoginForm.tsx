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

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  setIsLogin: Dispatch<SetStateAction<LoginState>>;
  animation: AnimationName
};

const LoginForm = (props: Props) => {

  const { onSubmit } = props;

  const { t } = useTranslation(['home']);

  return (
    <LoginFormContainer onSubmit={onSubmit} animation={props.animation}>
      <Title className="poppins-medium">My FG TrelloApp</Title>
      <ElementContainer>
        <LabelElement htmlFor="email">{t("email")}</LabelElement>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
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
        />
      </div>
      <SubmitButton type="submit">{t("submit")}</SubmitButton>
      <RegisterContainer>
        <RegisterButton onClick={() => {props.setIsLogin(LoginState.REGISTER)}}>
            <UserPlus size={30}></UserPlus>
        </RegisterButton>
        <LanguageContainer>
          <LanguageButton />
        </LanguageContainer>
      </RegisterContainer>
    </LoginFormContainer>
  );
};

export default LoginForm;