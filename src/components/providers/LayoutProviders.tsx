"use client";
import LoadingProvider from "@/hooks/LoadingProvider";
import { persistor, store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplineBackground from "../common/ui/SplineBackground";
import Navbar from "../common/ui/Navbar";
import AuthGuard from "./AuthGuard";
import { MokkBarProvider } from "./MokkBarContext";
import { ThemeProvider } from "./ThemeProvider";
import { usePathname } from "next/navigation";

const LayoutProviders = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const path = usePathname();
  console.log("path name : ", path);

  return (
    <>
      <ThemeProvider>
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  staleTime: 1000 * 60 * 5,
                  gcTime: 1000 * 60 * 30,
                  retry: 1,
                  refetchOnWindowFocus: false,
                },
              },
            })
          }
        >
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <LoadingProvider>
                <AuthGuard>
                  <MokkBarProvider>
                    {path == "/login" ? (
                      <>{children}</>
                    ) : (
                      <div className="min-h-screen bg-background relative transition-colors duration-300">
                        <SplineBackground activeTab={"كورسات"} />
                        <div className="relative z-10">
                          <Navbar />
                          <main className="py-8 p-4">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                              {children}
                            </div>
                          </main>
                        </div>
                      </div>
                    )}
                  </MokkBarProvider>
                </AuthGuard>
              </LoadingProvider>
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default LayoutProviders;
