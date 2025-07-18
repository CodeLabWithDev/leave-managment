import { useEffect } from "react";
import axios from "axios";

// Routes
import { RouterProvider } from "react-router";
import router from "./routes";

// Store
import { Provider } from "react-redux";
import store, { RootState } from "./store";
import { login, logout, setLoading } from "@/store/slices/authSlice"; // <== import your slice action
import { useDispatch, useSelector } from "react-redux";

// Components
import { Toaster } from "@/components/ui/sonner";
import Loading from "./components/Loading";

// Styles
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setLoading(true)); // add this
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = res.data.user;
          dispatch(login({ token, user }));
        } catch (err) {
          localStorage.removeItem("token");
          dispatch(logout());
        }
      } else {
        dispatch(setLoading(false));
      }
    };
    fetchUser();
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="bottom-right" richColors closeButton />
    </>
  );
}

export default function AppWithStore() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
