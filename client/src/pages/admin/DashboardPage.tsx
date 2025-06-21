import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { ContactForm } from "@shared/schema";
import { Loader2, CheckCircle, RefreshCw, DownloadIcon, LogOut, Eye, Phone, Mail, MapPin, Home, Calendar, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [filterStatus, setFilterStatus] = useState<'all' | 'processed' | 'unprocessed'>('all');
  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Use admin auth hook
  const { user, isLoading: isUserLoading, error: userError, isAuthenticated, logoutMutation } = useAdminAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isUserLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isUserLoading, isAuthenticated, setLocation]);

  // Fetch contact forms
  const { data: contactForms, isLoading, error } = useQuery<ContactForm[]>({
    queryKey: ["/api/admin/dashboard/contact-forms"],
    enabled: !!user,
  });

  // Mutation to mark as processed
  const processMutation = useMutation({
    mutationFn: async (formId: number) => {
      const res = await apiRequest("PATCH", `/api/admin/dashboard/contact-forms/${formId}/process`);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Contact form marked as processed.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/contact-forms"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "Failed to mark contact form as processed.",
        variant: "destructive",
      });
    },
  });

  // Handle error and loading states
  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (userError || !user) {
    // Redirect to login if not authenticated
    setLocation("/admin/login");
    return null;
  }

  // Filter contact forms based on selection
  const filteredForms = contactForms?.filter(form => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'processed') return form.isProcessed;
    if (filterStatus === 'unprocessed') return !form.isProcessed;
    return true;
  });

  // Handle CSV export
  const exportToCSV = () => {
    if (!contactForms || contactForms.length === 0) {
      toast({
        title: "Export failed",
        description: "No data available to export.",
        variant: "destructive",
      });
      return;
    }

    // Create CSV content
    const headers = [
      "ID", 
      "Name", 
      "Email", 
      "Phone", 
      "City", 
      "Land Size", 
      "North (ft)", 
      "North (in)", 
      "South (ft)", 
      "South (in)", 
      "East (ft)", 
      "East (in)", 
      "West (ft)", 
      "West (in)", 
      "Facing", 
      "Project Type", 
      "Message", 
      "Created At", 
      "Processed"
    ];
    
    const csvRows = [
      headers.join(','),
      ...contactForms.map(form => [
        form.id,
        `"${form.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
        `"${form.email ? form.email.replace(/"/g, '""') : ''}"`,
        `"${form.phone}"`,
        `"${form.city.replace(/"/g, '""')}"`,
        `"${form.landSize}"`,
        form.landDimensionNorthFeet,
        form.landDimensionNorthInches,
        form.landDimensionSouthFeet,
        form.landDimensionSouthInches,
        form.landDimensionEastFeet,
        form.landDimensionEastInches,
        form.landDimensionWestFeet,
        form.landDimensionWestInches,
        `"${form.landFacing}"`,
        `"${form.projectType}"`,
        `"${form.message ? form.message.replace(/"/g, '""') : ''}"`,
        `"${new Date(form.createdAt).toLocaleString()}"`,
        form.isProcessed ? 'Yes' : 'No'
      ].join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `contact-forms-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome, {user.name}</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="contact-forms" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="contact-forms">Contact Form Submissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contact-forms">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                  <div>
                    <CardTitle>Contact Form Submissions</CardTitle>
                    <CardDescription>View and manage contact form submissions from the website</CardDescription>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex space-x-1 bg-gray-100 rounded-md p-1">
                      <Button 
                        variant={filterStatus === 'all' ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => setFilterStatus('all')}
                      >
                        All
                      </Button>
                      <Button 
                        variant={filterStatus === 'unprocessed' ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => setFilterStatus('unprocessed')}
                      >
                        Unprocessed
                      </Button>
                      <Button 
                        variant={filterStatus === 'processed' ? "default" : "ghost"} 
                        size="sm"
                        onClick={() => setFilterStatus('processed')}
                      >
                        Processed
                      </Button>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => queryClient.invalidateQueries({ queryKey: ["/api/admin/dashboard/contact-forms"] })}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={exportToCSV}
                    >
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      Export CSV
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    <p>Error loading data. Please try again.</p>
                  </div>
                ) : filteredForms && filteredForms.length > 0 ? (
                  <div className="border rounded-md overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Land Size</TableHead>
                          <TableHead>Project Type</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredForms.map((form) => (
                          <TableRow key={form.id}>
                            <TableCell>{form.id}</TableCell>
                            <TableCell>{form.name}</TableCell>
                            <TableCell>{form.phone}</TableCell>
                            <TableCell>{form.city}</TableCell>
                            <TableCell>{form.landSize}</TableCell>
                            <TableCell>{form.projectType}</TableCell>
                            <TableCell>{new Date(form.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={form.isProcessed ? "success" : "default"}>
                                {form.isProcessed ? "Processed" : "New"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedForm(form);
                                    setIsDialogOpen(true);
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </Button>
                                
                                {!form.isProcessed && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => processMutation.mutate(form.id)}
                                    disabled={processMutation.isPending}
                                  >
                                    {processMutation.isPending ? (
                                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                    ) : (
                                      <CheckCircle className="h-4 w-4 mr-1" />
                                    )}
                                    Mark Processed
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No contact form submissions found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Form Details Modal */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Contact Form Details - #{selectedForm?.id}
              </DialogTitle>
              <DialogDescription>
                Complete information from contact form submission
              </DialogDescription>
            </DialogHeader>
            
            {selectedForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {/* Personal Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="font-medium">Name:</span>
                      <span>{selectedForm.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Phone:</span>
                      <span>{selectedForm.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Email:</span>
                      <span>{selectedForm.email || 'Not provided'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-600" />
                      <span className="font-medium">City:</span>
                      <span>{selectedForm.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Submitted:</span>
                      <span>{new Date(selectedForm.createdAt).toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Project Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      Project Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-accent"></div>
                      </div>
                      <span className="font-medium">Land Size:</span>
                      <span>{selectedForm.landSize} sq ft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-secondary"></div>
                      </div>
                      <span className="font-medium">Project Type:</span>
                      <span className="capitalize">{selectedForm.projectType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="font-medium">Land Facing:</span>
                      <span className="capitalize">{selectedForm.landFacing}</span>
                    </div>
                    <div className="pt-2">
                      <Badge variant={selectedForm.isProcessed ? "success" : "default"} className="text-sm">
                        {selectedForm.isProcessed ? "Processed" : "New Submission"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Land Dimensions */}
                <Card className="md:col-span-2">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Land Dimensions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm text-gray-600 mb-1">North Side</div>
                        <div className="text-lg font-bold text-primary">
                          {selectedForm.landDimensionNorthFeet}' {selectedForm.landDimensionNorthInches}"
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm text-gray-600 mb-1">South Side</div>
                        <div className="text-lg font-bold text-primary">
                          {selectedForm.landDimensionSouthFeet}' {selectedForm.landDimensionSouthInches}"
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm text-gray-600 mb-1">East Side</div>
                        <div className="text-lg font-bold text-primary">
                          {selectedForm.landDimensionEastFeet}' {selectedForm.landDimensionEastInches}"
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="font-medium text-sm text-gray-600 mb-1">West Side</div>
                        <div className="text-lg font-bold text-primary">
                          {selectedForm.landDimensionWestFeet}' {selectedForm.landDimensionWestInches}"
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Message */}
                {selectedForm.message && (
                  <Card className="md:col-span-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Additional Message
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                        {selectedForm.message}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="md:col-span-2 flex justify-end gap-3 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  {!selectedForm.isProcessed && (
                    <Button
                      onClick={() => {
                        processMutation.mutate(selectedForm.id);
                        setIsDialogOpen(false);
                      }}
                      disabled={processMutation.isPending}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {processMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Mark as Processed
                    </Button>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}