import { AppBar } from "@packages/ui";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-indigo-100">
      <AppBar title="페이지를 찾을 수 없음" back={() => navigate(-1)} />

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-indigo-600">404</h1>
            <div className="h-2 w-24 bg-indigo-600 mx-auto my-4 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
            <p className="text-gray-500 mb-8">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
          </div>

          <div className="space-y-4">
            <button onClick={() => navigate("/")} className="w-full py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md">
              홈으로 돌아가기
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 px-6 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors duration-300"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
