import { useDispatch, useSelector } from "react-redux";
import { selectUserOption } from "../redux/options/selectors";
import { useEffect } from "react";
import { fetchUserOptions } from "../redux/options/operations";
import { Form, Formik } from "formik";
import { Input } from "./Options/Input";
import { Select } from "./Options/Select";
import { inputType } from "../utils/inputType";

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const options = useSelector(selectUserOption);
  let emptyOptions = Object.keys(options).length === 0;

  let register;
  if (!emptyOptions) {
    register = options.userAuthentication;
    
  }

  useEffect(() => {
    dispatch(fetchUserOptions());
  }, [dispatch]);
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      {!emptyOptions && (
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
                  <ul className="flex flex-col gap-[12px]">
                    {register.options.map(
                      ({ placeholder, title, validation, key, type, list }) => (
                        <li key={key}>
                          {type === "input" ? (
                            <Input
                              type={inputType(key)}
                              name={key}
                              placeholder={placeholder}
                              title={title}
                              validation={validation}
                            />
                          ) : (
                            <Select list={list} name={key} title={title} />
                          )}
                        </li>
                      )
                    )}
                  </ul>
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
