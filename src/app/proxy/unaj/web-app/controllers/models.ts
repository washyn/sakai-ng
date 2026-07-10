
export interface LoginInput {
  user: string;
  password: string;
}

export interface LoginOutput {
  accessToken: string;
}

export interface ModelSample {
  testValue?: string;
  secondValue?: string;
}
