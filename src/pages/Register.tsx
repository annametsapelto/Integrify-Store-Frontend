import { Input, InputLabel } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { createUser } from "../redux/reducers/userReducer";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateUserType } from "../types/UserType";
import { registration } from "../validation/registration";
import { yupResolver } from "@hookform/resolvers/yup";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateUserType>({
    resolver: yupResolver(registration),
  });

  const onSubmit: SubmitHandler<CreateUserType> = (data) => {
    dispatch(createUser(data));
    navigate("/");
  };

  return (
    <div className="register">
      <div>
        <Link to="/">Return to home page.</Link>
        <h1>Register here</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputLabel htmlFor="username">Your username</InputLabel>
          <Input id="username" {...register("name")} type="string"></Input>
          <p>{errors.name?.message}</p>
          <InputLabel htmlFor="userEmail">Your email</InputLabel>
          <Input type="email" id="userEmail" {...register("email")}></Input>
          <p>{errors.email?.message}</p>
          <InputLabel htmlFor="userPassword">Your password</InputLabel>
          <Input
            type="password"
            id="userPassword"
            {...register("password")}
          ></Input>
          <p>{errors.password?.message}</p>
          <InputLabel htmlFor="userPassword">Enter password again</InputLabel>
          <Input
            type="password"
            id="userPassword2"
            {...register("password2")}
          ></Input>
          <p>{errors.password2?.message}</p>
          <button type="submit">Register</button>
        </form>
      </div>
      {user && (
        <div>
          <h1>You are already registered</h1>
          <Link to="/">Return to home page.</Link>
        </div>
      )}
    </div>
  );
};

export default Register;
