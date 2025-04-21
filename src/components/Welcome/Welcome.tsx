import {Stack, Text, Title } from '@mantine/core';
import classes from './Welcome.module.css';
import { Transition } from '@mantine/core';
import { useState, useEffect } from 'react';
interface Props {
  isMobile: boolean;
}
export function Welcome({ isMobile }: Props) {
  const [mounted, setMounted] = useState(false);
  // Set `mounted` to true when the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
    <Stack >
    <Transition
          mounted={mounted}
          transition="fade-right"
          duration={1000} // Transition duration in milliseconds
          timingFunction="ease"
        >
          {(styles) => (
            <Title
              className={classes.title}
              ta="center"
              mt="xl"
              style={styles} // Apply the transition styles
            >
              Welcome to <br />
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'orange', to: 'yellow.1' }}
              >
                Keha Home
              </Text>
            </Title>
          )}
        </Transition>

      <Text c="dimmed" ta="center" size="md" maw={isMobile ? '100%' : '70%'} mx="auto" mb={50} >
      Construction forms are crucial for architects as they influence a building’s structure, aesthetics, and functionality. They ensure stability by determining load distribution while shaping the building’s visual identity and allowing creative expression. Forms dictate how spaces are used, enhancing aspects like acoustics and natural light. They also ensure compatibility with materials, adapt to environmental factors, and promote sustainability by optimizing energy efficiency. Proper forms reduce costs by minimizing material waste and simplifying construction processes. 
      </Text>
      </Stack>
    </>
  );
}
