import { useEffect, useState, type ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

// Type and models
import type { RootState } from "@/store";

function ProtectedRoute({
  children,
  authentication,
}: {
  children: ReactNode;
  authentication: boolean;
}) {
  const navigate = useNavigate();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (authentication && (!authStatus || !token)) {
      navigate("/login", { replace: true });
    } else if (!authentication && authStatus && token) {
      navigate("/", { replace: true });
    }
  }, [authStatus, authentication, navigate]);

  return <>{children}</>;
}

export default ProtectedRoute;
