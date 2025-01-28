export const getUserInfo = () => {
    const {name="", email="", isAuth="", userId=""} = JSON.parse(localStorage.getItem("authInfo")) || {};
    return {name,email,userId, isAuth};
}