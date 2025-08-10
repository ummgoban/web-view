import { postToApp } from "@packages/shared";

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-600">404</h1>
            <div className="h-2 w-24 bg-primary-600 mx-auto my-4 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
            <p className="text-gray-500 mb-8 whitespace-pre-line">{"요청하신 페이지가 존재하지 않거나\n 이동되었을 수 있습니다."}</p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "Home" } })}
              className="w-full py-3 px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 shadow-md"
            >
              홈으로 돌아가기
            </button>
            <button
              onClick={() => {
                // webview 상에서 라우팅으로 인해 404페이지가 뜰 경우
                if (window.history.length > 1) {
                  window.history.back();
                }
                // native 상에서 라우팅으로 인해 404페이지가 뜰 경우
                else {
                  postToApp({ type: "NATIVE_GO_BACK" });
                }
              }}
              className="w-full py-3 px-6 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-300"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
