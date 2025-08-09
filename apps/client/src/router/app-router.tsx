import { BrowserRouter, Routes, Route } from "react-router";
import { DetailPage, NotFoundPage } from "@/domain";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/market/:id" element={<DetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
