// Layouts
import MainLayout from "@/components/layouts/MainLayout";
import ProtectedRoute from "@/components/layouts/ProtectedRoute";

// Components
import Home from "@/pages/home/Index";
import UserIndex from "@/pages/users/UserIndex";
import LeaveIndex from "@/pages/leave/LeaveIndex";

const pageRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute authentication>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-leaves",
        element: (
          <ProtectedRoute authentication>
            <LeaveIndex />
          </ProtectedRoute>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectedRoute authentication>
            <UserIndex />
          </ProtectedRoute>
        ),
      },
      {
        path: "approvals",
        element: (
          <ProtectedRoute authentication>
            <div>Leave Approvals - Coming Soon</div>
          </ProtectedRoute>
        ),
      },
      {
        path: "audit",
        element: (
          <ProtectedRoute authentication>
            <div>Audit Logs - Coming Soon</div>
          </ProtectedRoute>
        ),
      },
    ],
  },
];

export default pageRoutes;
