import { Redirect, Route } from "wouter";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Loader2 } from "lucide-react";

interface ProtectedAdminRouteProps {
  component: React.ComponentType;
  path: string;
}

export const ProtectedAdminRoute = ({ component, path }: ProtectedAdminRouteProps) => {
  const { user, isLoading } = useAdminAuth();
  const Component = component;

  return (
    <Route path={path}>
      {(params) => {
        if (isLoading) {
          return (
            <div className="flex items-center justify-center min-h-screen">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }
        
        if (!user) {
          return <Redirect to="/admin/login" />;
        }
        
        return <Component {...params} />;
      }}
    </Route>
  );
};
