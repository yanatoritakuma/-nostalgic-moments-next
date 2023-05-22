import { memo, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalPostDeleteBox } from '@/components/features/post/ModalPostDeleteBox';
import { ModalUserEditBox } from '@/components/features/user/ModalUserEditBox';

export const UserEditMenuBox = memo(() => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalFlag, setModalFlag] = useState({
    edit: false,
    delete: false,
  });

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button onClick={handleClick}>
        <span className="editIcon">
          <MoreHorizIcon style={{ fontSize: 34, color: '#333' }} />
        </span>
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setModalFlag({
              ...modalFlag,
              edit: true,
            });
          }}
        >
          <EditIcon />
          編集
        </MenuItem>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setModalFlag({
              ...modalFlag,
              delete: true,
            });
          }}
        >
          <DeleteIcon />
          削除
        </MenuItem>
      </Menu>
      <ModalUserEditBox
        open={modalFlag.edit}
        setOpen={() =>
          setModalFlag({
            ...modalFlag,
            edit: false,
          })
        }
      />
      <ModalPostDeleteBox
        open={modalFlag.delete}
        setOpen={() =>
          setModalFlag({
            ...modalFlag,
            delete: false,
          })
        }
      />
    </div>
  );
});

UserEditMenuBox.displayName = 'UserEditMenuBox';
