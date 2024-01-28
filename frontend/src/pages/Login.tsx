import React from "react";
import { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { Gender, ItextMessage } from "../types";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./Login.css";

interface IUserInputs {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  situationalInformation: string;
  majorEventsDescription: string;
  command: string;
  image: File;
}

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInputs>();
  // const [formData, setFormData] = useState<IUserInputs>({
  //   firstName: "",
  //   lastName: "",
  //   age: 0,
  //   gender: "",
  //   situationalInformation: "",
  //   majorEventsDescription: "",
  //   command: "",
  //   image: {} as FileList,
  // });

  const [serverResponse, setServerResponse] = useState<string | null>(null);

  const onSubmit: SubmitHandler<IUserInputs> = async (data: IUserInputs) => {
    try {
      // Make an Axios POST request to your backend with the user data
      const response = await axios.post('http://localhost:3000/image_to_vid', data);
      console.log(response.data);

      const responseData = response.data;
      // Set the server response to display on the front end
      setServerResponse(responseData);

    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
   
  let navigate = useNavigate();

  return (
    <div className="body">
      <p className="loginTitle">User Information</p>
      <form className="userLogin" onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={"First Name"}
          {...register("firstName", { required: true })}
        />
        <input
          defaultValue={"Last Name"}
          {...register("lastName", { required: true })}
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
        <input
          defaultValue={"Write a command to the AI"}
          {...register("command", { required: true })}
        />
        <input type="file" {...register("image", { required: true })} />
        <input type="submit" onClick={() => navigate("/chat")}></input>
      </form>
      {serverResponse && (
        <div className="server-response">
          <p>Server Response:</p>
          <pre>{JSON.stringify(serverResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Login;
