type errorsTypes= "wrong_schema" |"conflict"  | "unauthorized"| "not_found"  ;

export interface errors {
  type: errorsTypes;
  message: string;
}

export function testError(error: object): error is errors {
  return (error as errors).type !== undefined;
}

export function statusCodeFromErrors(type: errorsTypes) {
  if (type === "wrong_schema") return 422;
  if (type === "conflict") return 409;
  if (type === "unauthorized") return 401;
  if (type === "not_found") return 404;
 
  
  return 400;
}

export function failSchema(message?: string): errors {
  return { type: "wrong_schema", message };
}

export function failsConflict(message?: string): errors {
  return { type: "conflict", message };
}

export function failUnauth(message?: string): errors {
  return { type: "unauthorized", message };
}
export function failNotFound(message?: string): errors {
  return { type: "not_found", message };
}

