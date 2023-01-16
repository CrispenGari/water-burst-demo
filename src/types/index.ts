export interface ActionType<T> {
  payload: T;
  type: string;
}

export interface StateType {
  user: {
    user: any;
    isLoggedIn: boolean;
  };
}
