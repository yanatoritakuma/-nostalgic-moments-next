import { css } from '@emotion/react';
import { TextBox } from '@/components/elements/TextBox';
import React, { memo, useState } from 'react';
import { SelectBox } from '@/components/elements/SelectBox';

export const Form = memo(() => {
  const [postState, setPostState] = useState({
    title: '',
    text: '',
    imag: '',
    prefecture: '',
    address: '',
  });

  return (
    <section css={formBox}>
      <div css={textBox}>
        <TextBox
          label="タイトル"
          value={postState.title}
          onChange={(e) =>
            setPostState({
              ...postState,
              title: e.target.value,
            })
          }
          fullWidth
        />
      </div>
      <div css={textBox}>
        <TextBox
          label="内容"
          value={postState.text}
          onChange={(e) =>
            setPostState({
              ...postState,
              text: e.target.value,
            })
          }
          fullWidth
          multiline
          rows={3}
        />
      </div>
      <div css={textBox}>
        <SelectBox />
      </div>
    </section>
  );
});

Form.displayName = 'Form';

const formBox = css`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;

const textBox = css`
  margin: 20px 0;
`;
