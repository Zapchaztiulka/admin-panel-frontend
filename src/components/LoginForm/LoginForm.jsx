import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { getValitadionSchemaLoginForm } from "../../utils/getValitadionSchemaLoginForm";
import { FormError } from "./FormError";
import { logIn } from "../../redux/auth/operations";

const initialValues = {
  email: "",
  password: "",
};
export const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(logIn(values));
    console.log("actions", actions);
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getValitadionSchemaLoginForm}
      >
        {formik => {
          return (
             <Form>
          <label>
            <p>email</p>
            <Field name="email" type="email" />
            <FormError name="email" />
          </label>
          <label>
            <p>password</p>
            <Field name="password" type="password" />
            <FormError name="password" />
          </label>
          <button type="submit"  disabled={!(formik.dirty && formik.isValid)}>Submit</button>
        </Form>
          )
        }}
       
      </Formik>
    </div>
  );
};


 