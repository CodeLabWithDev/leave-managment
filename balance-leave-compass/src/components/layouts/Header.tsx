import { useNavigate } from "react-router";
// Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Icons
import { LogOut, User, Building2 } from "lucide-react";

// Store
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { Avatar, AvatarFallback } from "../ui/avatar";

export default function Header() {
  const dispatch = useDispatch();
  const navgate = useNavigate();

  const userData = useSelector((state: RootState) => state.auth.userData);

  const handleLogout = () => {
    dispatch(logout());
    navgate("/login");
  };

  const getRoleColor = (role: string | undefined) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-background">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
          <Building2 className="h-5 w-5 text-white" />
        </div>

        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-lg text-foreground">
            Leave Management
          </span>
          <span className="text-xs text-muted-foreground">
            Smart workforce solutions
          </span>
        </div>
      </div>

      {/* Right: User info & logout */}
      <div className="flex items-center gap-3">
        <div className="flex gap-3 items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                {userData?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {userData?.name}
              </p>
              <div className="flex flex-start py-1">
                <Badge
                  variant="secondary"
                  className={`text-xs bg-green-100 text-green ${getRoleColor(
                    userData?.role
                  )}`}
                >
                  {userData?.role}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => handleLogout()}>
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    </header>
  );
}
