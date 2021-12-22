import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import styled from "styled-components";

function AvatarChooser({ src, onChange }) {
  return (
    <label htmlFor="icon-button-profile-photo">
      <InvisibleInput
        accept="image/*"
        id="icon-button-profile-photo"
        type="file"
        onChange={onChange}
      />
      <IconButton component="span">
        <Badge
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          badgeContent={<PhotoCamera sx={{ width: 50, height: 50 }} />}
          overlap="circular"
        >
          <Avatar
            alt="User profile picture"
            src={src}
            sx={{ width: 300, height: 300 }}
          />
        </Badge>
      </IconButton>
    </label>
  );
}

export default AvatarChooser;

const InvisibleInput = styled.input`
  display: none;
`;
