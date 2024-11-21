import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage.jsx";
import WorkOrdersPage from "./pages/WorkOrders/WorkOrdersPage.jsx";
import WebsiteHeader from "./components/WebsiteHeader/WebsiteHeader.jsx";
import EmployeesPage from "./pages/Employees/EmployeesPage.jsx";
import WorkOrderEmployeesPage from "./pages/WorkOrderEmployees/WorkOrderEmployeesPage.jsx";
import PurchaseOrdersPage from "./pages/PurchaseOrders/PurchaseOrdersPage.jsx";
import PurchaseOrderItemsPage from "./pages/PurchaseOrderItems/PurchaseOrderItemsPage.jsx";
import MaterialPage from "./pages/Materials/MaterialsPage.jsx";

//create router prop that configures what elements are displayed for each path
const router = createBrowserRouter([
  {
    path: "/",
    element: <WebsiteHeader />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/work-orders",
        element: <WorkOrdersPage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "/work-order-employees",
        element: <WorkOrderEmployeesPage />,
      },
      {
        path: "/purchase-orders",
        element: <PurchaseOrdersPage />
      },
      {
        path: "/purchase-order-items",
        element: <PurchaseOrderItemsPage/>
      },
      {
        path: "/materials",
        element: <MaterialPage />
      }
    ],
  },
]);

// create a query client that is responsible for managing the cache and fetching data
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  );
}