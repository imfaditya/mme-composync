export type BackendResponse<T> = {
  status: number;
  message: string;
  result: T;
};

export type AddressResponse = {
  id: string;
  text: string;
};
