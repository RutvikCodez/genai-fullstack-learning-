import { useEffect, useState } from "react";
import { AuthContext } from "./auth.context";
import { getMe } from "../services/auth.api";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMe();
      setUser(data.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
