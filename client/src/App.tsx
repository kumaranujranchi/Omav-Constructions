import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PopupContactFormWrapper from "@/components/common/PopupContactForm";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AboutUs from "@/pages/AboutUs";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Projects from "@/pages/Projects";
import ProjectDetail from "@/pages/ProjectDetail";
import HowItWorks from "@/pages/HowItWorks";
import ClientSolutions from "@/pages/ClientSolutions";
import Resources from "@/pages/Resources";
import ContactUs from "@/pages/ContactUs";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

// Admin pages
import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <Switch>
      {/* Main Website Routes */}
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutUs} />
      <Route path="/services" component={Services} />
      <Route path="/services/:id" component={ServiceDetail} />
      <Route path="/projects" component={Projects} />
      <Route path="/projects/:id" component={ProjectDetail} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/client-solutions" component={ClientSolutions} />
      <Route path="/resources" component={Resources} />
      <Route path="/contact" component={ContactUs} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" component={LoginPage} />
      <ProtectedAdminRoute path="/admin/dashboard" component={DashboardPage} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        {/* Only show header and footer for main website, not admin routes */}
        {!isAdminRoute && <Header />}
        <main className="flex-grow">
          <Router />
        </main>
        {!isAdminRoute && <Footer />}
      </div>
      <Toaster />
      {/* Only show popup contact form for main website, not admin routes */}
      {!isAdminRoute && <PopupContactFormWrapper />}
    </QueryClientProvider>
  );
}

export default App;
