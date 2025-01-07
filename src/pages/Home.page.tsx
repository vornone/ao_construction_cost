import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { AppShell, Burger, Flex, Input, Stack,Center } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '@mantine/core';
import ConstructionCostForm from '@/components/ConstructionCostForm/ConstructionCostForm';
import { useMediaQuery } from '@mantine/hooks';
export function HomePage() {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 600px)')?? false;
  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed:{desktop: true,mobile: !opened},
      }}
      padding="md"
    >
      <AppShell.Header >
        <Flex align="center" gap="md" justify={'space-between'} p={'sm'} w={'100%'}>
          <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        />
        <Text size="xl" fw={700}>AO Construction Cost  </Text>
        <ColorSchemeToggle /></Flex>

      </AppShell.Header>

      <AppShell.Navbar p="md" >Navbar</AppShell.Navbar>

      <AppShell.Main>
        <Center><Welcome isMobile={isMobile}></Welcome></Center>
        <ConstructionCostForm isMobile={isMobile}></ConstructionCostForm>
      </AppShell.Main>
    </AppShell>
  );
}
