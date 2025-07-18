import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

// Js Dependencies
import { useState } from "react";
import { useNavigate } from "react-router";

// Store
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { Building2 } from "lucide-react";

// Custome Hooks
import { useAppToast } from "@/hooks/useAppToast";

export default function LoginForm() {
  // Variables
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useAppToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    common?: string;
  }>({});

  // Methods
  // Validate fields
  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter a valid email.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";

    return newErrors;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // store in Redux
      localStorage.setItem("token", token);
      dispatch(login({ token, user }));

      dispatch(
        login({
          email,
          password,
        })
      );
      showToast(
        "default",
        "Login sucessfull",
        "Welcome to Leave Management System!"
      );
      navigate("/");
    } catch (err) {
      setErrors({ common: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  // Demo users list
  const demoUsers = [
    { role: "Admin", email: "admin@example.com" },
    { role: "Manager", email: "manager@example.com" },
    { role: "Employee", email: "employee@example.com" },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-lg w-full mx-auto">
      <div className="text-center space-y-2">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
          <Building2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
          Leave Management
        </h1>
        <p className="text-gray-600">Sign in to access your dashboard</p>
      </div>
      <Card className="shadow-md bg-card text-card-foreground gap-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-1 text-sm">
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full"
              />
              {errors.email && (
                <p className="text-start text-red-500 text-xs mt-1 ml-3">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full"
              />
              {errors.password && (
                <p className="text-start text-red-500 text-xs mt-1 ml-3">
                  {errors.password}
                </p>
              )}
            </div>
            {errors.common && (
              <p className="text-red-500 text-xs">{errors.common}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-200"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold mb-3 text-foreground">
            Demo Users
          </h2>
          <ul className="space-y-2">
            {demoUsers.map((user) => (
              <li key={user.role} className="flex text-sm">
                <span className="font-medium text-foreground">
                  {user.role}:
                </span>
                <span className="ml-2">{user.email}</span>
              </li>
            ))}
            <hr className="my-3" />
            <li className="flex text-sm">
              <span className="font-medium text-foreground">
                Common Password:
              </span>
              <span className="ml-2">P@ssw0rd</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
