
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUserDetails } from '../contexts/UserContext';
import { useCart } from '../contexts/CartContext';

export const useUserStatus =  () => {
    const { fetchUserData } = useUserDetails();
    const { setIsAuthenticated } = useAuth();
    const {setNewAccessToken} = useCart()
    const navigate = useNavigate();

    const handleUserStatus = async(user, token, loginType, verificationType) => {
        const userStatus = user.status;


        if (userStatus === "new") {
            toast.success(`${verificationType} verified`, {
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
            setIsAuthenticated(true);
            setNewAccessToken(token.access_token)
            await fetchUserData(user.id); // Fetch user data before navigation
            toast.success(`Welcome Back! ${user.display_name}`, {
                onClose: () => navigate('/')
            });
        
        }
    };

    return handleUserStatus;
};