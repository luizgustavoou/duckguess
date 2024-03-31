import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth-slice";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { status, user } = useSelector(selectAuth);

  const [auth, setAuth] = useState<boolean>(false);

  useEffect(() => {
    setAuth(!!user);
  }, [user]);

  return { auth };
};
