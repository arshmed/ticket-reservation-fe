export const setAuthenticated = (value) => {
    localStorage.setItem("isAuth", value);
};
export const getAuthenticated = () => {
    return localStorage.getItem("isAuth");
};
export const setEmail = (value) => {
    localStorage.setItem("email", value);
};
export const getEmail = () => {
    return localStorage.getItem("email");
};