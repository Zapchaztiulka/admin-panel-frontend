import { useDispatch, useSelector } from "react-redux";
import { selectUserOptions } from "../redux/options/selectors";
import { useEffect } from "react";
import { fetchUserOptions } from "../redux/options/operations";
import { Form, Formik } from "formik";

import { DynamicProperties } from "./DynamicProperties/DynamicProperties";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const allUserOptions = useSelector(selectUserOptions);
  let emptyOptions = Object.keys(allUserOptions).length === 0;
  let register;
  if (!emptyOptions) {
    register = allUserOptions.userAuthentication;
  
  }

  useEffect(() => {
    dispatch(fetchUserOptions());
  }, [dispatch]);

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      {!emptyOptions && register &&  (
        <div>
          <h2>{register?.title}</h2>
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
              userSurname: "",
              phone: "",
              role: "",
            }}
            onSubmit={handleSubmit}
          >
            {() => {
              return (
                <Form>
                  <DynamicProperties options={register.options} />
                  <button className="w-[20px] h-[40px]" type="submit">
                    Registration
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </>
  );
};
