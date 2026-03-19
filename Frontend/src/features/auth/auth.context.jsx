import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
