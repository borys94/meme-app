import { useContext } from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import {
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
} from "@stores/api/user";
import { AppContext } from "@components/AppContextProvider";

interface Props {
  templateId: string;
  likes: number;
}

const FavouriteButton = ({ templateId, likes }: Props) => {
  const { user, favourites } = useContext(AppContext);
  const [addFavouriteRequest, { isLoading: isAddFavouriteLoading }] =
    useAddFavouriteMutation();
  const [removeFavouriteRequest, { isLoading: isRemoveFavouriteLoading }] =
    useRemoveFavouriteMutation();

  const addFavourite = () => {
    addFavouriteRequest({
      userId: user.id,
      templateId: templateId,
    });
  };

  const removeFavourite = () => {
    removeFavouriteRequest({
      userId: user.id,
      templateId: templateId,
    });
  };

  if (!user) {
    return null;
  }

  const isLiked = favourites.some((favourite) => favourite.id === templateId);

  return (
    <ListItemButton
      disabled={isRemoveFavouriteLoading || isAddFavouriteLoading}
      onClick={isLiked ? removeFavourite : addFavourite}
    >
      <ListItemIcon sx={{ gap: 0.5 }}>
        {isLiked ? (
          <FavoriteIcon color="error" />
        ) : (
          <FavoriteBorderIcon color="error" />
        )}
        {likes}
      </ListItemIcon>
      <ListItemText primary={isLiked ? "You like it!" : "Like"} />
    </ListItemButton>
  );
};

export default FavouriteButton;
