import { memo } from 'react';
import { css } from '@emotion/react';
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
};

export const UserInfoInputBox = memo((props: Props) => {
  const { authStatte, setAuthStatte } = props;
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
