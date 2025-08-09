type CustomErrorType<T = unknown> = T extends Error ? T : unknown;

class CustomError<T = unknown> extends Error {
  errorCode?: number;
  errorMessage?: string;

  constructor(args: CustomErrorType<T>) {
    if (args instanceof Error) {
      super(args.message);
    } else {
      super('서버에서 오류가 발생했어요. 문제가 지속된다면 문의주세요');
      this.errorMessage =
        '서버에서 오류가 발생했어요. 문제가 지속된다면 문의주세요';
    }
    Object.assign(this, args);
  }
}

export default CustomError;
