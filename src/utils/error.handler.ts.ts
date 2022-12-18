export type PromiseError = {
  promiseError: {
    message: string;
    error: unknown;
  };
};

export type InvalidIdError = {
  invalidIdError: {
    message: string;
    id: string;
  };
};

//Quando tomarmos um erro de Promisse, pegará este erro.
export function promiseError(error: unknown): PromiseError {
  return {
    promiseError: {
      message: "unable to request the Database",
      error: error,
    },
  };
}

//Quando tomarmos um erro de ID, será este erro. Esse erro vai acontecer se o front nos passar um id errado.
export function invalidIdError(id: string): InvalidIdError {
  return {
    invalidIdError: {
      message: "invalid id on request, please submit a Object Id",
      id: id,
    },
  };
}

//Concatemos os dois tipos para um tipo único
export type CustomErrors = PromiseError | InvalidIdError;

