import { JSXElementConstructor, ReactElement, memo, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

type Props = {
  labels: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: ReactElement<any, string | JSXElementConstructor<any>>[];
  selectTab: number;
  setSelectTab: React.Dispatch<React.SetStateAction<number>>;
};

export const TabsBox = memo((props: Props) => {
  const { labels, icon, selectTab, setSelectTab } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectTab(newValue);
  };

  return (
    <Tabs value={selectTab} onChange={handleChange}>
      {labels.map((label, index) => (
        <Tab icon={icon !== undefined ? icon[index] : ''} label={label} key={index} />
      ))}
    </Tabs>
  );
});

TabsBox.displayName = 'TabsBox';
