import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { AppShell, Burger, Flex, Input, Stack,Center, Image, BackgroundImage, Tabs, TabsPanel, Box, ThemeIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Text } from '@mantine/core';
import ConstructionCostForm from '@/components/ConstructionCostForm/ConstructionCostForm';
import { useMediaQuery } from '@mantine/hooks';
import { FooterCentered } from '@/components/PageComponents/Footer/Footer';
import LanguagePicker from '@/components/LanguagePicker/LanguagePicker';
import i18n from '@/i18n';
import { useTranslation } from 'react-i18next';
import KehaLogo from '@/assets/logo/KehaLogo';
import { useMantineColorScheme } from '@mantine/core';
export function HomePage() {
  const [opened, { toggle }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 600px)')?? false;
  const { t } = useTranslation();
  const { colorScheme: themeColorScheme, toggleColorScheme } = useMantineColorScheme();
  const tabsValue = [
    {
      tab_number: 'tab1',
      tab_title: t("newBuildingCost")},
    {
      tab_number: 'tab2',
      tab_title: t('buildingRenovation')},
    {
      tab_number: 'tab3',
      tab_title: t('interiorDecoration')},
  ]
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
          {/* <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
        /> */}
        {/* <Image 
        style={{'--svg-fill-color': 'var(--mantine-color-blue)'}}
          src="./src/assets/logo/AO_Construction_cost_logo_trim-01.svg" 
          width={isMobile ? 30 : 40}
          height={isMobile ? 30 : 40}
          alt="AO Construction Cost Logo"
        /> */}

        <LanguagePicker></LanguagePicker>
        <ThemeIcon w={isMobile ? 50 : 60}  variant="outline" color={themeColorScheme === 'dark' ? 'white' : 'gray.8'}  bd={0}><KehaLogo/></ThemeIcon>
        {/* <Text size="xl" fw={700}>Keha Home </Text> */}
        <ColorSchemeToggle /></Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md" >Coming Soon</AppShell.Navbar>
      <AppShell.Main>
        <BackgroundImage src="./src/assets/heroImage.jpg" style={{width: '100%', height: '100%'}}></BackgroundImage>
        <Center><Welcome isMobile={isMobile}></Welcome></Center>
        <Center>
        <Tabs  w={isMobile ? '100%' : '70%'} variant='default' radius={'md'} bd={2} defaultValue={'tab1'} color='yellow'>
          <Tabs.List grow justify='center' w={'100%'} > 
            {tabsValue.map((tab) => (<Tabs.Tab key={tab.tab_number} value={tab.tab_number}><Text size="md">{tab.tab_title}</Text></Tabs.Tab>))}
          </Tabs.List>
          <Tabs.Panel value='tab1'><ConstructionCostForm isMobile={isMobile}></ConstructionCostForm></Tabs.Panel>
          <Tabs.Panel value='tab2'><Center h={'50dvh'}> <Text size="xl" ta={'center'} fw={700}>coming soon...</Text></Center></Tabs.Panel>
          <Tabs.Panel value='tab3'><Center h={'50dvh'}> <Text size="xl" ta={'center'} fw={700}>coming soon...</Text></Center></Tabs.Panel>
        </Tabs>
        </Center>
      </AppShell.Main>
      <AppShell.Footer pos={'sticky'}><FooterCentered/></AppShell.Footer>
    </AppShell>
  );
}
