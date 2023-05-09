import { css } from '@emotion/react';
import { memo } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

type TLinks = {
  name: string;
  url: string;
};

type Props = {
  title: string;
  text?: string;
  links?: TLinks[];
};

export const AccordionBox = memo((props: Props) => {
  const { title, text, links } = props;
  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <p>{text}</p>
          <div css={linkBox}>
            {links?.map((link, index) => (
              <Link key={index} href={link.url}>
                {link.name}
              </Link>
            ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
});

AccordionBox.displayName = 'AccordionBox';

const linkBox = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  a {
    margin: 10px;
  }
`;
