import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { AppShell, Burger, Flex, Input, Stack,Center, Image, BackgroundImage } from '@mantine/core';
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
        {/* <Image 
        style={{'--svg-fill-color': 'var(--mantine-color-blue)'}}
          src="./src/assets/logo/AO_Construction_cost_logo_trim-01.svg" 
          width={isMobile ? 30 : 40}
          height={isMobile ? 30 : 40}
          alt="AO Construction Cost Logo"
        /> */}

        <Text size="xl" fw={700}>Keha Home </Text>
        <ColorSchemeToggle /></Flex>

      </AppShell.Header>

      <AppShell.Navbar p="md" >Coming Soon</AppShell.Navbar>
          
      <AppShell.Main>
        <BackgroundImage src="./src/assets/heroImage.jpg" style={{width: '100%', height: '100%'}}></BackgroundImage>
        <Center><Welcome isMobile={isMobile}></Welcome></Center>
        <ConstructionCostForm isMobile={isMobile}></ConstructionCostForm>
      </AppShell.Main>
    </AppShell>
  );
}
