import PropTypes from "prop-types";
import { inputType } from "../../utils/inputType";
import { Input } from "./Options/Input";
import { Select } from "./Options/Select";
import { CheckBox } from "./Options/CheckBox";

export const DynamicProperties = ({ options }) => {
  return (
    <ul className="flex flex-col gap-[12px]">
      {options.map(({ placeholder, title, validation, key, type, list }) => (
        <li key={key}>
          {(() => {
            switch (type) {
              case "input":
                return (
                  <Input
                    type={inputType(key)}
                    name={key}
                    placeholder={placeholder}
                    title={title}
                    validation={validation}
                  />
                );
              case "select":
                return <Select list={list} name={key} title={title} />;
              case "checkBox":
                return (
                  <CheckBox
                    type="checkbox"
                    name={key}
                    value={key}
                    title={title}
                  />
                );

              default:
                return null;
            }
          })()}
        </li>
      ))}
    </ul>
  );
};

DynamicProperties.propTypes = {
  options: PropTypes.array.isRequired,
};
