export const logoutTypes = {
  LOG_OUT: `LOG_OUT`
} as const;

export const logoutActions = {
  loginRequest: (logOutRequestModel) => ({
    type: logoutTypes.LOG_OUT,
    payload: logOutRequestModel
  })
};

// export type LogOutActions = ReturnType<InferValueTypes<typeof >>;
