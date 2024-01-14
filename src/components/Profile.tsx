import React from 'react';
import {
  Avatar,
  TextInput,
  Button,
  Container,
  Blockquote,
  Text,
  Group,
  Anchor,
} from '@mantine/core';
import { IconFolderFilled, IconInfoCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import classes from '../components/Modules/Profile.module.css';
import cx from 'clsx';

const Profile: React.FC = () => {
  const { firstName, lastName, telegram, github, resume, email, phone, about } =
    useSelector((state: RootState) => state.form);

  const icon = <IconInfoCircle />;

  return (
    <Container size="md">
      <Group mt="md">
        <Avatar radius="xxl" size="xl" color="myColor">
          {firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'АИ'}
        </Avatar>

        <Text
          size="xl"
          variant="gradient"
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {firstName}
        </Text>
        <Text
          size="xl"
          variant="gradient"
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {lastName}
        </Text>
      </Group>
      <Group mt="md">
        <Anchor
          className={cx(classes.link)}
          href={`https://t.me/${telegram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFolderFilled />
          Telegram
        </Anchor>

        <Anchor className={cx(classes.link)} href={github}>
          <IconFolderFilled />
          GitHub
        </Anchor>

        <Anchor
          className={cx(classes.link)}
          href={resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconFolderFilled />
          Resume
        </Anchor>
      </Group>
      <TextInput
        mt="md"
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        value={email}
        disabled={true}
      />
      <TextInput
        mt="md"
        withAsterisk
        label="Номер телефона"
        placeholder="+7 99-999-999"
        disabled={true}
        value={phone}
      />
      <Blockquote mt="xl" color="myColor" cite="– About" icon={icon}>
        {about}
      </Blockquote>

      <Link to="/form">
        <Button mt="md" variant="filled" size="md">
          Начать
        </Button>
      </Link>
    </Container>
  );
};

export default Profile;
