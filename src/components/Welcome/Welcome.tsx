import { Anchor, Image, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import classes from './Welcome.module.css';

interface Props {
  isMobile: boolean;
}
export function Welcome({ isMobile }: Props) {
  return (
    <>
    <Stack>
      <Title className={classes.title} ta="center" mt={'xl'}>
        Welcome to{' '}
        <br/> 
        <Text inherit variant="gradient" component="span" gradient={{ from: 'orange', to: 'yellow.1' }}>
          Keha Home
        </Text>
      </Title>

      <Text c="dimmed" ta="center" size="md" maw={isMobile ? '100%' : '70%'} mx="auto" mb={50} >

      Construction forms are crucial for architects as they influence a building’s structure, aesthetics, and functionality. They ensure stability by determining load distribution while shaping the building’s visual identity and allowing creative expression. Forms dictate how spaces are used, enhancing aspects like acoustics and natural light. They also ensure compatibility with materials, adapt to environmental factors, and promote sustainability by optimizing energy efficiency. Proper forms reduce costs by minimizing material waste and simplifying construction processes. 
      </Text>
      </Stack>
    </>
  );
}
