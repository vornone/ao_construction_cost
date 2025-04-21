
import {useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Switch } from '@mantine/core';
import { TbSun, TbMoon } from 'react-icons/tb';
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const sunIcon = <TbSun size={18} color={theme.colors.yellow[6]}/>;
  const moonIcon = <TbMoon size={18} color={theme.colors.yellow[6]}/>;
  return (
      <Switch
        size='md'
        color="dark.4"
        onLabel={moonIcon}
        offLabel={sunIcon}
        checked={useMantineColorScheme().colorScheme === 'dark'}
        onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')}
      />
  );
}
