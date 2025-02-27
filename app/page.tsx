"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Building2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z
    .string()
    .min(4, {
      message: "Email must be at least 4 characters.",
    })
    .email({ message: "Please enter a valid email address." }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: "Login success",
      description: `${data.email} ${data.password}`,
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 mobile-text">
      <div className="w-full max-w-md space-y-8 bg-white py-3 sm:p-8 rounded-lg shadow-md flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="w-2/3 space-y-6 mobile-text-sm"
          >
            <div className="flex justify-center items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-500" />
              <span className="text-xl font-bold mobile-heading">
                PropManager
              </span>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your password"
                      {...field}
                      type="password"
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600">
              Login
            </Button>
            <div className="text-end text-blue-400 text-sm cursor-pointer mobile-text-sm">
              Forgot password?
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
