export const storeUserDataInLocalStorage = (data) => {
    localStorage.setItem('id_token', data.token.id_token);
    localStorage.setItem('access_token', data.token.access_token);
    localStorage.setItem('refresh_token', data.token.refresh_token);
    localStorage.setItem('expires_in', String(data.token.expires_in));
    localStorage.setItem('userId', data.user.id);
    localStorage.setItem('userDetails', JSON.stringify(data.user));
};