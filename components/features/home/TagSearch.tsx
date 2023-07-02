import { memo, useContext, useState } from 'react';
import { css } from '@emotion/react';
import { TextBox } from '@/components/elements/TextBox';
import { ButtonBox } from '@/components/elements/ButtonBox';
import { useRouter } from 'next/router';
import { MessageContext } from '@/provider/MessageProvider';

export const TagSearch = memo(() => {
  const [searcTag, setSearcTag] = useState('');
  const router = useRouter();
  const { message, setMessage } = useContext(MessageContext);

  const onClikcSearcTag = () => {
    if (searcTag !== '') {
      router.push({
        pathname: '/tagSearch',
        query: { tag: searcTag },
      });
    } else {
      setMessage({
        ...message,
        text: '空文字で検索はできません。',
        type: 'error',
      });
    }
  };

  return (
    <section css={tagSearchBox}>
      <h2>タグで検索</h2>
      <div css={searchBox}>
        <TextBox
          label="タグ検索"
          value={searcTag}
          onChange={(e) => setSearcTag(e.target.value)}
          fullWidth
        />
        <ButtonBox onClick={() => onClikcSearcTag()}>検索</ButtonBox>
      </div>
    </section>
  );
});

TagSearch.displayName = 'TagSearch';

const tagSearchBox = css`
  padding: 60px 0;
  background-color: #e6eae6;
`;

const searchBox = css`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  min-width: 280px;

  button {
    margin-left: 20px;
  }
`;
