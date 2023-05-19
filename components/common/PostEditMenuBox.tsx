import { memo, useContext, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalPostEditBox } from '@/components/common/ModalPostEditBox';
import { ModalPostDeleteBox } from '@/components/common/ModalPostDeleteBox';
import { TPost } from '@/types/post';
import { PostContext } from '@/provider/PostProvider';

type Props = {
  posts: TPost[];
  index: number;
};

export const PostEditMenuBox = memo((props: Props) => {
  const { posts, index } = props;
  const { postGlobal, setPostGlobal } = useContext(PostContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [modalFlag, setModalFlag] = useState({
    edit: false,
    delete: false,
  });
  const [selectPost, setSelectPost] = useState(-1);

  useEffect(() => {
    setPostGlobal({
      ...postGlobal,
      id: posts[selectPost]?.id,
      userId: posts[selectPost]?.user_id,
      title: posts[selectPost]?.title,
      text: posts[selectPost]?.text,
      image: posts[selectPost]?.image,
      prefecture: posts[selectPost]?.prefecture,
      address: posts[selectPost]?.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectPost]);

  useEffect(() => {
    if (modalFlag.edit === false) {
      setSelectPost(-1);
    }
  }, [modalFlag.edit]);

  useEffect(() => {
    if (modalFlag.delete === false) {
      setSelectPost(-1);
    }
  }, [modalFlag.delete]);

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
      <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            setModalFlag({
              ...modalFlag,
              edit: true,
            });
            setSelectPost(index);
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
            setSelectPost(index);
          }}
        >
          <DeleteIcon />
          削除
        </MenuItem>
      </Menu>
      <ModalPostEditBox
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

PostEditMenuBox.displayName = 'PostEditMenuBox';
