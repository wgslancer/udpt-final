import { useRef, useState } from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { LoginInterface } from "../../../../provider/AuthProvider/AuthProvider";
import Modal from "../../../global/Modal";

interface LoginModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  handleOnSubmit: (loginData: LoginInterface) => void;
}

type LoginForm = {
  "delivery-email": string;
  "delivery-password": string;
};

const LoginModal = ({
  handleClose,
  handleOpen,
  isOpen,
  handleOnSubmit,
}: LoginModalProps) => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const onSubmitValid: SubmitHandler<LoginForm> = (data) => {
    handleOnSubmit({
      email: data["delivery-email"],
      password: data["delivery-password"],
    });
    handleClose();
  };
  const onSubmitInvalid: SubmitErrorHandler<LoginForm> = (error) => {
    console.log(error);
  };
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen}>
      <div className="bg-white p-8 rounded-2xl flex-center-center">
        <form
          onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}
          className="flex-center-center flex-col"
          autoComplete="off"
        >
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("delivery-email")}
            autoComplete="off"
            type="text"
            placeholder="Email"
            className="input w-full max-w-xs input-info"
          />
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            autoComplete="new-password"
            {...register("delivery-password")}
            type="password"
            placeholder="Password"
            className="input w-full max-w-xs input-info"
          />
          <button type="submit" className="btn mt-3">
            Login
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
