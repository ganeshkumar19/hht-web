export const confirmOtpCode = async (confirmationResult, code) => {
    const result = await confirmationResult.confirm(code);
    return result;
};