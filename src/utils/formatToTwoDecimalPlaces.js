const formatToTwoDecimalPlaces = (value) => {
    // if (!value) return "0.00"; // Default to "0.00" if the input is empty

    const num = parseFloat(value);
    if (isNaN(num)) return value; // Return the original value if it's not a number

    // Check if the value already has a decimal with two or fewer digits
    const parts = value.split(".");
    if (parts.length === 2 && parts[1].length <= 2) {
        return value; // Return the original value if formatting is already correct
    }

    return num.toFixed(2); // Otherwise, format to two decimal places
};

export default formatToTwoDecimalPlaces;


