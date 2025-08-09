import { BrowserRouter, Routes, Route } from "react-router";
import { DetailPage } from "@/domain";
import { lazy } from "react";

import { LoadingCircle, WithSuspense } from "@packages/ui";

const NotFoundPage = lazy(() => import("@/domain/not-found/page/not-found.page"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/:id" element={<DetailPage />} />
        <Route
          path="*"
          element={
            <WithSuspense fallback={<LoadingCircle animation />}>
              <NotFoundPage />
            </WithSuspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
