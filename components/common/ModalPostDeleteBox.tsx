import { memo, useContext, useState } from 'react';
import { css } from '@emotion/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CheckBox } from '@/components/elements/Checkbox';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { PostContext } from '@/provider/PostProvider';
import { useMutatePost } from '@/hooks/post/useMutatePost';
import { deleteImgStorage } from '@/utils/deleteImgStorage';

type Props = {
  open: boolean;
  setOpen: (value: React.SetStateAction<boolean>) => void;
};

export const ModalPostDeleteBox = memo((props: Props) => {
  const { open, setOpen } = props;
  const { postGlobal, setPostProcess } = useContext(PostContext);
  const { deletePostMutation } = useMutatePost();
  const { deleteImg } = deleteImgStorage();
  const [confirmFlag, setConfirmFlag] = useState(false);

  const onClickDelete = async () => {
    setOpen(false);
    await deletePostMutation
      .mutateAsync(postGlobal.id)
      .then(() => setPostProcess(true))
      .then(
        () =>
          postGlobal.image !== '' && deleteImg(postGlobal.image, 'postImages', postGlobal.userId)
      );
  };

  return (
    <div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box css={deleteBox}>
          <h3>削除</h3>
          <p>
            この投稿を削除しますか？
            <br />
            この操作は元に戻せません。
          </p>
          <div css={checkBox}>
            <CheckBox
              label="削除する。"
              check={confirmFlag}
              onChange={(e) => setConfirmFlag(e.target.checked)}
            />
          </div>
          <ButtonBox onClick={() => onClickDelete()} disabled={!confirmFlag}>
            削除
          </ButtonBox>
        </Box>
      </Modal>
    </div>
  );
});

ModalPostDeleteBox.displayName = 'ModalPostDeleteBox';

const deleteBox = css`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 90vh;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 10px;
  overflow-y: scroll;
  text-align: center;

  p {
    color: #e9546b;
  }

  button {
    background-color: #e9546b;
    width: 100%;
    max-width: 200px;

    &:hover {
      background-color: #e9546b;
    }
  }
`;

const checkBox = css`
  margin: 20px auto;
  width: fit-content;
`;
