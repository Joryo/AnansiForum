import Api from "./Api";

const BASE_PATH = "/members";

interface UpdateBody {
  name: string;
  email: string;
  password?: string;
}

export const updateMember = async (
  id: string,
  email: string,
  name: string,
  password: string,
) => {
  const body: UpdateBody = {
    name,
    email,
  };

  if (password) {
    body.password = password;
  }

  return Api.put(`${BASE_PATH}/${id}`, body);
};
