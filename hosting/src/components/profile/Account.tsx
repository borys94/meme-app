import { useContext, ChangeEvent } from "react";
import { Avatar, Stack } from "@mui/material";

import { AppContext } from "@components/AppContextProvider";
import LoaderButton from "@components/common/LoaderButton";

import { useUpdateAvatarMutation } from "@stores/api/user";
import fileToBase64 from "@utils/fileToBase64";

const Account = () => {
  const { user } = useContext(AppContext);
  const [updateAvatarRequest, { isLoading }] = useUpdateAvatarMutation();

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    if (file) {
      updateAvatarRequest({
        userId: user.id,
        image: await fileToBase64(file),
      });
    }
  };

  return (
    <Stack direction="row" gap={2}>
      <Avatar src={user?.avatar} sx={{ width: 128, height: 128 }} />
      <Stack direction="row" gap={2} alignItems="center">
        <LoaderButton variant="contained" component="label" loader={isLoading}>
          Upload
          <input hidden accept="image/*" type="file" onChange={onFileChange} />
        </LoaderButton>
      </Stack>
    </Stack>
  );
};

export default Account;
