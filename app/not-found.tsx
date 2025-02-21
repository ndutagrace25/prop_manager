"use client";
import { Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Building2 className="text-blue-500" />
      <div className="p-6 rounded-lg shadow-md text-center w-1/3">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">Could not find requested page</p>
        <Button
          variant="outline"
          className="mt-4 ml-2"
          onClick={() => (window.location.href = "/")}
        >
          Back To Home
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
