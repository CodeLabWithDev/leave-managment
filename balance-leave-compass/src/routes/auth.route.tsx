// Components
import Login from "@/pages/auth/Login/Index";
import NotFound from "@/pages/NotFound";

// Layouts
import BlankLayout from "@/components/layouts/BlankLayout";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";

const authRoutes = [
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedRoute authentication={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: (
          <ProtectedRoute authentication={false}>
            <NotFound />
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default authRoutes;
