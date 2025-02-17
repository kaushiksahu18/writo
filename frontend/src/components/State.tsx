// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import App from '@/App';
import { login, setIsAuthenticated } from '@/redux/auth';
import { useAppDispatch } from '@/redux/hooks';
import { AuthState, UserState } from '@/types/user';
import axiosInstance from '@/utils/axiosInstance';
import  { useEffect, useState } from 'react'
import Loading from './ui/Loading';
const State = () => {

    const [isloading, setisloading] = useState<boolean>(false)
    const dispatch = useAppDispatch()
  
    useEffect(() => {
      const fetechdata = async () => {
        setisloading(true);
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        if (!accessToken || accessToken.trim() === "") {
          dispatch(setIsAuthenticated(false));
          setisloading(false);
          return;
        }
        try {
          const response = await axiosInstance.get('/user/self')
          if (response.data) {
            const user= response.data?.data;
            const userState: UserState = {
                userId: user?._id,
                email: user?.email,
                fullName:user?.fullName,
                institution:user?.institution,
                phone:user?.phone,
                target:user?.target,
                accessToken: accessToken,
                refreshToken: refreshToken,
                isAdmin:user?.isAdmin,
                isMentor:user?.isMentor,
                profilePic:user?.profilePic,
                isLoggedIn: true,
              };
              const loginPayload: AuthState = {
                isAuthenticated: true,
                user: userState,
                error: null,
              };
              dispatch(login(loginPayload));
          } else if (response.error) {
            
            dispatch(setIsAuthenticated(false));
            setisloading(false);
            return;
          }
        } catch {
          dispatch(setIsAuthenticated(false));
        } finally {
          setisloading(false);
  
        }
      }
      fetechdata()
    }, [dispatch])
  
    if (isloading) {
      return <Loading />;
    }
    return <App />
  }

export default State
