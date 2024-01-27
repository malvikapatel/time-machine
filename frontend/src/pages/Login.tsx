import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Gender, ItextMessage } from "../types";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface IUserInputs {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  situationalInformation: string;
  majorEventsDescription: string;
  image: File;
}

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInputs>();
  const onSubmit: SubmitHandler<IUserInputs> = (data: IUserInputs) =>
    console.log(data);

  let navigate = useNavigate();

  return (
    <div className="body">
      <p className="loginTitle">User Information</p>
      <form className="userLogin" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="inputField"
          placeholder={"First Name"}
          {...register("firstName", { required: true })}
        />
        <input
          className="inputField"
          placeholder={"Last Name"}
          {...register("lastName", { required: true })}
        />
        <input
          className="inputField"
          placeholder={"Age"}
          {...register("age", { required: true })}
        />
        <select
          className="inputField"
          {...register("gender", { required: true })}
        >
          <option value={"Male"}>Male</option>
          <option value={"Male"}>Female</option>
          <option value={"Male"}>Other</option>
        </select>
        <input
          className="inputField large"
          placeholder={"Describe a past situation you want to understand"}
          {...register("situationalInformation", { required: true })}
        />
        <input
          className="inputField large"
          placeholder={"What major events happened around this time?"}
          {...register("majorEventsDescription", { required: true })}
        />
        <input type="file" {...register("image", { required: true })} />
        <input type="submit" onClick={() => navigate("/chat")}></input>
      </form>
    </div>
  );
}

export default Login;
