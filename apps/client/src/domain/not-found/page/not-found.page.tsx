import { useNavigate, useSearchParams } from "react-router";

import { postToApp, resetStorage } from "@packages/shared";

import { useNativeMessageStore } from "@/store";

const getSearchParams = (key: string | null) => {
  return key ? atob(key) : undefined;
};

export const NotFoundPage = () => {
  /**
   * @description Base64 encoded callback url
   * @example
   * http://<base-url>/404?cb-uri="<some-url>&native={true|false}&native-screen="<some-screen>"&native-screen-params="<some-params>"
   */
  const [params] = useSearchParams();

  const cbUri = getSearchParams(params.get("cb-uri"));
  const native = getSearchParams(params.get("native"));
  const nativeScreen = getSearchParams(params.get("native-screen"));
  const nativeScreenParams = getSearchParams(params.get("native-screen-params"));

  const { previousScreen } = useNativeMessageStore();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-primary-600">404</h1>
            <div className="h-2 w-24 bg-primary-600 mx-auto my-4 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">페이지를 찾을 수 없습니다</h2>
            <p className="text-gray-500 mb-8 whitespace-pre-line">
              {"요청하신 페이지가 존재하지 않거나\n 이동되었을 수 있습니다."}
            </p>
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
                // 이전 상태가 존재하면 이전 상태로 돌아가기
                if (previousScreen) {
                  postToApp({ type: "NATIVE_NAVIGATION", payload: previousScreen });
                }
                // native 상에서 라우팅으로 인해 404페이지가 뜰 경우
                if (native) {
                  // native screen이 있는 경우
                  if (nativeScreen) {
                    let parsedNativeScreenParams: object | undefined;
                    try {
                      parsedNativeScreenParams = nativeScreenParams
                        ? JSON.parse(nativeScreenParams)
                        : undefined;
                    } catch (error) {
                      // nothing to do
                      console.error(error);
                    }
                    postToApp({
                      type: "NATIVE_NAVIGATION",
                      payload: { screen: nativeScreen, params: parsedNativeScreenParams },
                    });
                  }
                  // native screen이 없는 경우 뒤로가기
                  else {
                    postToApp({ type: "NATIVE_GO_BACK" });
                  }
                }
                // webview 상에서 라우팅으로 인해 404페이지가 뜰 경우
                else if (window.history.length > 1) {
                  // callback uri가 있는 경우 callback uri로 이동
                  if (cbUri) {
                    navigate(cbUri);
                  }
                  // callback uri가 없는 경우 뒤로가기
                  else {
                    navigate(-1);
                  }
                }
                // webview의 history가 없는 경우 native home으로 이동
                else {
                  postToApp({ type: "NATIVE_NAVIGATION", payload: { screen: "Home" } });
                }
              }}
              className="w-full py-3 px-6 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors duration-300"
            >
              이전 페이지로 돌아가기
            </button>
          </div>
        </div>
      </div>
      {(__DEV__ || __LOCAL_DEV__ || __LOCAL_PROD__) && (
        <>
          <div className="flex flex-col gap-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded active:bg-red-600 transition-colors duration-300"
              onClick={() => resetStorage("session")}
            >
              Reset Session Storage
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded active:bg-red-600 transition-colors duration-300"
              onClick={() => resetStorage("local")}
            >
              Reset Local Storage
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NotFoundPage;
