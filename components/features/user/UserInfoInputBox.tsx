import { ChangeEvent, memo } from 'react';
import { css } from '@emotion/react';
import Image from 'next/image';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { TextBox } from '@/components/elements/TextBox';

type Props = {
  authStatte: {
    email: string;
    name: string;
  };
  setAuthStatte: React.Dispatch<
    React.SetStateAction<{
      email: string;
      name: string;
    }>
  >;
  onChangeImageHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string;
};

export const UserInfoInputBox = memo((props: Props) => {
  const { authStatte, setAuthStatte, onChangeImageHandler, previewUrl } = props;
  return (
    <div css={userInfoInputBox}>
      <TextBox
        className="text"
        label="メール"
        value={authStatte.email}
        onChange={(e) =>
          setAuthStatte({
            ...authStatte,
            email: e.target.value,
          })
        }
        fullWidth
      />
      <TextBox
        className="text"
        label="名前"
        value={authStatte.name}
        onChange={(e) =>
          setAuthStatte({
            ...authStatte,
            name: e.target.value,
          })
        }
        fullWidth
      />
      <ButtonBox onChange={onChangeImageHandler} upload />

      {previewUrl !== '' && (
        <div css={previewBox}>
          <Image src={previewUrl} fill sizes="(max-width: 70px)" alt="プレビュー" />
        </div>
      )}
    </div>
  );
});

UserInfoInputBox.displayName = 'UserInfoInputBox';

const userInfoInputBox = css`
  .text {
    margin: 20px 0;
    display: block;
  }
`;

const previewBox = css`
  margin: 12px auto;
  width: 300px;
  height: 284px;
  position: relative;

  @media (max-width: 425px) {
    width: 140px;
    height: 140px;
  }

  img {
    object-fit: cover;
    border-radius: 50%;
  }
`;
