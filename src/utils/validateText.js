const isEmpty = (text) => {
    return !text || text.toString().trim() === ""
}

const isNotInLengthRange = (text, minLength, maxLength) => {
    return text.toString().length < minLength || text.toString().length > maxLength
}

const transformStringToRegExp = (regexp) => {
    if(typeof regexp === 'string') {
        return new RegExp(regexp.slice(1, -1));
    } else {
        return regexp;
    }

}

const isValidRegExp = (text, regexp) => {
    if(Array.isArray(regexp)) {
        const invalidArray = regexp.map(exp => !transformStringToRegExp(exp).test(text.toString()))
        return invalidArray.every(isInvalid => isInvalid === true)
    } else {
        return !transformStringToRegExp(regexp).test(text.toString());
    }
}

export const validateText = ({
    text,
    validation,
    uniqueArray
}) => {

    if(!validation || text === 'undefined') {
        return {isWarning:false, warnings:[]};
    }

    const checksArray = [];
    const warnings = [];

    if(text && validation?.regexp) {
        try {
            let invalid = isValidRegExp(text, validation?.regexp);
            checksArray.push(invalid);
            invalid && warnings.push(validation?.warningMessages?.regexp)
        } catch (error) {
            console.log('Error in regex validation. Message:', error, "Possibly problem with expression of regex on backed:",  validation?.regexp);
        }
    }

    if(text && (validation?.minLength || validation?.maxLength)) {
        const invalid = isNotInLengthRange(text, validation?.minLength, validation?.maxLength);
        checksArray.push(invalid);
        invalid && warnings.push(validation?.warningMessages?.length);
    }

    if(text && (validation?.minValue || validation?.maxValue)) {
        const number = Number(text);

        if(!isNaN(number)) {
            const invalid = number < validation?.minValue || number > validation?.maxValue;

            checksArray.push(invalid);
            invalid && warnings.push(validation?.warningMessages?.value)
        }
    }

    if(validation?.required && validation?.required === true) {

        let invalid = isEmpty(text);
        const requiredWarnings = validation?.warningMessages?.required;
        checksArray.push(invalid);
        invalid && warnings.push(...requiredWarnings);
    }

    if(text && validation?.uniqueVariable && uniqueArray) {
        const invalid = uniqueArray.includes(text.toString());
        checksArray.push(invalid);
        invalid && warnings.push(validation?.warningMessages?.uniqueVariable);
    }

    return {
        isWarning: checksArray.some(check => check === true),
        warnings
    }
}
