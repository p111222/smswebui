// validateInputField.js
const validateInputField = (value, regex, maxLength, maxLimit) => {

    console.log("value -> " + value);
    console.log("regex -> " + regex);
    console.log("maxLength -> " + maxLength);
    console.log("maxLimit -> " + maxLimit);
    console.log("test -> " + regex.test(value));




    if (maxLength !== null) {
        if (value.length > maxLength) {
            return false;
        }
    }

    if (!regex.test(value)) {
        return false;
    }

    if (maxLimit) {
        if (value > maxLimit)
            return false
    }

    return true;
};

export default validateInputField;
