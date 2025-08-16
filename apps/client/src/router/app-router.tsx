import { BrowserRouter, Routes, Route } from "react-router";
import { lazy } from "react";

import DetailPage from "@/domain/detail/page/detail.page";

import { LoadingCircle, WithSuspense } from "@packages/ui";

const NotFoundPage = lazy(() => import("@/domain/not-found/page/not-found.page"));

const withSuspensePage = (children: React.ReactNode) => {
  return <WithSuspense fallback={<LoadingCircle animation />}>{children}</WithSuspense>;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/:id" element={withSuspensePage(<DetailPage />)} />
        <Route path="*" element={withSuspensePage(<NotFoundPage />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
