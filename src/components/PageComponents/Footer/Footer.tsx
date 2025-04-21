
import { TbBrandInstagram, TbBrandTwitter, TbBrandYoutube, TbBrandLinkedin, TbBrandFacebook, TbBrandTiktok } from 'react-icons/tb';
import { ActionIcon, Anchor, Group, Text } from '@mantine/core';
import classes from './FooterCentered.module.css';
export function FooterCentered() {

  const links = [
    { link: 'https://www.instagram.com/keha.interior/', label: 'instagram' },
    { link: 'https://www.facebook.com/keha.decor.idea', label: 'facebook' },
  ];
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>

        {/* <Group className={classes.links}>{items}</Group> */}

        <Group gap="xs" justify="flex-end"  wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl" onClick={() => window.open(links.find((link) => link.label === 'facebook')?.link, '_blank')}>
            <TbBrandFacebook size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandTiktok size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl" onClick={() => window.open(links.find((link) => link.label === 'instagram')?.link, '_blank')}>
            <TbBrandInstagram size={18}  />
          </ActionIcon>
        </Group>
        <Group gap="xs" justify="flex-end"   p={10}>
          <Text size="xs" c="dimmed">
            Copyright © {new Date().getFullYear()}
          </Text>
          <Text size="xs" c="dimmed" fw={700}>
            Keha Home
          </Text>
        </Group>
      </div>
    </div>
  );
}