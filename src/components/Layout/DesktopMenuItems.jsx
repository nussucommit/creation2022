import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import menuItems from '../../constants/Navigation/navbar_menu_items';

function DesktopMenuItems() {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      {menuItems.map((page) => {
        const { pageTitle, pageURL } = page;

        return (
          <MenuItem
            key={pageTitle}
            component={NavLink}
            to={pageURL}
            className='navItem'
            sx={{
              ':hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            <Typography
              style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                position: 'relative',
                zIndex: 2,
              }}
            >
              {pageTitle}
            </Typography>
          </MenuItem>
        );
      })}
    </Box>
  );
}

export default DesktopMenuItems;
