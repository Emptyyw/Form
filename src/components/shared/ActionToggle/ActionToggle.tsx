import cx from 'clsx';
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import classes from './ActionToggle.module.css';
import { colorScheme } from '../../../enums/Enums';

export function ActionToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('Light', {
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = () => {
    setColorScheme(
      computedColorScheme === colorScheme.Light ? colorScheme.Dark : colorScheme.Light,
    );
  };

  return (
    <Group className={cx(classes.group)} justify='end'>
      <ActionIcon
        onClick={toggleColorScheme}
        variant='default'
        size='xl'
        aria-label='Toggle color scheme'
        radius='lg'
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Group>
  );
}
