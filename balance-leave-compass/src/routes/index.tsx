// JS Depencencies
import { createBrowserRouter } from "react-router-dom";

// routes
import pageRoutes from "./page.route";
import authRoutes from "./auth.route";

const router = createBrowserRouter([...authRoutes, ...pageRoutes]);

export default router;
