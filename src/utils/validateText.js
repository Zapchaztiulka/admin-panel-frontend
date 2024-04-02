const isEmpty = (text) => {
  return !text || text.toString().trim() === "";
};

const isNotInLengthRange = (text, minLength, maxLength) => {
  return (
    text.toString().length < minLength || text.toString().length > maxLength
  );
};

const transformStringToRegExp = (regexp) => {
  return typeof regexp === "string" ? new RegExp(regexp.slice(1, -1)) : regexp;
};

const isValidRegExp = (text, regexp) => {
  if (Array.isArray(regexp)) {
    const invalidArray = regexp.map(
      (exp) => !transformStringToRegExp(exp).test(text.toString())
    );
    return invalidArray.every((isInvalid) => isInvalid === true);
  } else {
    return !transformStringToRegExp(regexp).test(text.toString());
  }
};

export const validateText = (text, validation, uniqueArray) => {
  if (!validation || text === "undefined") {
    return;
  }

  const checksArray = [];
  const warnings = [];

  if (text && validation?.regexp) {
    try {
      const invalid = isValidRegExp(text, validation?.regexp);
      checksArray.push(invalid);
      invalid &&
        validation?.warningMessages?.regexp &&
        warnings.push(validation?.warningMessages?.regexp);
    } catch (error) {
      console.log(
        "Error in regex validation. Message:",
        error,
        "Possibly problem with expression of regex on backed:",
        validation?.regexp
      );
    }
  }

  if (text && (validation?.min || validation?.max)) {
    const invalid = isNotInLengthRange(text, validation?.min, validation?.max);
    checksArray.push(invalid);
    invalid &&
      validation?.warningMessages?.length &&
      warnings.push(validation?.warningMessages?.length);
  }

  if (text && (validation?.minValue || validation?.maxValue)) {
    const number = Number(text);

    if (!isNaN(number)) {
      const invalid =
        number < validation?.minValue || number > validation?.maxValue;

      checksArray.push(invalid);
      invalid &&
        validation?.warningMessages?.value &&
        warnings.push(validation?.warningMessages?.value);
    }
  }

  if (validation?.required && (validation?.required === true || validation?.required === "required")) {
    const invalid = isEmpty(text);
    checksArray.push(invalid);
    invalid &&
      validation?.warningMessages?.required &&
      warnings.push(validation?.warningMessages?.required);
  }

  if (text && validation?.unique && uniqueArray) {
    const invalid = uniqueArray
      .map((el) => el.toString())
      .includes(text.toString());
    checksArray.push(invalid);
    invalid &&
      validation?.warningMessages?.uniqueVariable &&
      warnings.push(validation?.warningMessages?.uniqueVariable);
  }

  let isWarning = checksArray.includes(true);
  return {
        isWarning,
        warnings,
      };
};
