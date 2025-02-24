import { toast } from 'react-toastify';
import { useLogin } from '../contexts/LoginContext';
import { useCart } from '../contexts/CartContext';

export const handleUserStatus = (user, token, loginType, navigate, verificationType) => {
    const {setIsAuthenticated} = useLogin()
    const {setNewAccessToken} = useCart()
    const userStatus = user.status;

    if (userStatus === "new") {
        toast.success(`${verificationType} verified and user needs to complete registration!`, {
            onClose: () => navigate('/register', {
                state: {
                    method: loginType,
                    user_name: user.user_name,
                    access_token: token.access_token,
                    user_id: user.id,
                    status: user.status
                }
            })
        });
    } else if (userStatus === "registered") {
        sessionStorage.setItem('firstTimeLogin', 'true');
        setIsAuthenticated(true)
        setNewAccessToken(token.access_token)
        toast.success(`Welcome Back! ${user.display_name}`, {
            onClose: () => navigate('/')
        });
    }
};