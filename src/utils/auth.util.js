export const checkToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        return true
    } else {
        return false
    }
}