import React, {useState} from 'react';
import {Avatar, Button, Menu, MenuItem} from '@mui/material';
import {User} from '../../types.ts';
import Box from '@mui/material/Box';
import {deepPurple} from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const isOpen = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <>
            <Button variant={'contained'} sx={{marginLeft: 'auto',marginRight: '50px'}}>Add new</Button>
            <Box>
                <Avatar onClick={handleClick} sx={{bgcolor: deepPurple[500]}}><PersonIcon/></Avatar>
                <Menu open={isOpen} anchorEl={anchorEl} keepMounted={true} onClose={handleClose}>
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>My Account {user.username}</MenuItem>
                </Menu>
            </Box>
        </>
    );
};

export default UserMenu;8