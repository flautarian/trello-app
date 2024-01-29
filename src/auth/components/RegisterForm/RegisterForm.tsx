import { FormEventHandler } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { RegisterFormContainer } from "./RegisterForm.styles";
import { AnimationName } from "../../../utils/components/globalAnimationsComponent/globalAnimationsComponent";

type Props = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  animation: AnimationName;
};

const RegisterForm = (props: Props) => {
  const { onSubmit } = props;
  return (
    <RegisterFormContainer onSubmit={onSubmit} animation={props.animation}>
      <h2 className="poppins-medium">Register</h2>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Full Name"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Email Address"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          placeholder="Password"
        />
      </div>
      <button type="submit">Submit</button>
      <Link to={"/user/login"}>
        Already have an account? Sign in
      </Link>
    </RegisterFormContainer>
  );
};

export default RegisterForm;