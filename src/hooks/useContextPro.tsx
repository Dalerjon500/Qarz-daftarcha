type User = {
  name?: string;
  email?: string;
  roles?: string[];
};

function useContextPro() {
  return {
    state: {
      user: null as User | null,
      isLoading: false,
    },
    dispatch: () => undefined,
  };
}

export default useContextPro;
