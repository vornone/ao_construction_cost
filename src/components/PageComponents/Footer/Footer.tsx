
import { TbBrandInstagram, TbBrandTwitter, TbBrandYoutube, TbBrandLinkedin, TbBrandFacebook } from 'react-icons/tb';
import { ActionIcon, Anchor, Group } from '@mantine/core';
import classes from './FooterCentered.module.css';
const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Store' },
  { link: '#', label: 'Careers' },
];

export function FooterCentered() {
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
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandLinkedin size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <TbBrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}