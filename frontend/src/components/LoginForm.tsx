import { FC } from 'react';
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from "../store";
import { useDispatch } from "react-redux";

const LoginForm:FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values, actions) => {
    actions.resetForm();
    // localStorage.setItem('name', values.username);
    dispatch(login({ username: values.username }))
    navigate("/");
  };
  const { values,errors,touched,isSubmitting,handleBlur,handleChange,handleSubmit,} = useFormik(
    {
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit,
  });
  console.log(errors);

  return (
    <form className="login" onSubmit={handleSubmit} autoComplete="off">
        <h1>Login</h1>
      <label htmlFor="username">username</label>
      <input
        value={values.username}
        onChange={handleChange}
        id="username"
        type="username"
        placeholder=""
        onBlur={handleBlur}
      />      
      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors.password && touched.password && (
        <p className="error">{errors.password}</p>
      )}
      
      <button disabled={isSubmitting} type="submit">
        Submit
      </button>
    </form>
  );
};
export default LoginForm;