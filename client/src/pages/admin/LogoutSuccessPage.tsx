import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useLocation } from "wouter";
import { CheckCircle } from "lucide-react";

export default function LogoutSuccessPage() {
  const [, setLocation] = useLocation();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Logout Successful</CardTitle>
          <CardDescription className="text-center">
            You have been successfully logged out of the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-gray-500">
          <p>Thank you for using the admin dashboard. You are now logged out of your account.</p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            className="w-full" 
            onClick={() => setLocation("/")}
          >
            Return to Website
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => setLocation("/admin/login")}
          >
            Log In Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}