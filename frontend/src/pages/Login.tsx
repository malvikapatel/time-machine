import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Gender, ItextMessage } from "../types";
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

  return (
    <div className="body">
      <p className="loginTitle">User Information</p>
      <form className="userLogin" onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={"First Name"}
          {...register("age", { required: true })}
        />
        <input
          defaultValue={"Last Name"}
          {...register("age", { required: true })}
        />
        <input defaultValue={"Age"} {...register("age", { required: true })} />
        <input
          defaultValue={"Gender"}
          {...register("gender", { required: true })}
        />
        <input
          defaultValue={"Describe a past situation you want to understand"}
          {...register("situationalInformation", { required: true })}
        />
        <input
          defaultValue={"What major events happened around this time?"}
          {...register("majorEventsDescription", { required: true })}
        />
        <input type="file" {...register("image", { required: true })} />
        <input type="submit"></input>
      </form>
    </div>
  );
}

export default Login;
