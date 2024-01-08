import React from 'react';
import {
  Avatar,
  TextInput,
  Button,
  Container,
  Blockquote,
  Text,
  Group,
} from '@mantine/core';
import { IconFolderFilled, IconInfoCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useProfile } from '../context/ProfileContext';

const Profile: React.FC = () => {
  const { profileData } = useProfile();
  const icon = <IconInfoCircle />;

  return (
    <Container size="md">
      <Group mt="md">
        <Avatar radius="xxl" size="xl" color="myColor">
          {profileData.firstName && profileData.lastName
            ? `${profileData.firstName[0]}${profileData.lastName[0]}`
            : 'АИ'}
        </Avatar>

        <Text
          size="xl"
          variant="gradient"
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {profileData.firstName}
        </Text>
        <Text
          size="xl"
          variant="gradient"
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {profileData.lastName}
        </Text>
      </Group>
      <Group mt="md">
        <Text>
          <a
            style={{ display: 'flex', alignItems: 'center' }}
            href={`https://t.me/${profileData.telegram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconFolderFilled />
            Telegram
          </a>
        </Text>
        <Text>
          <a style={{ display: 'flex', alignItems: 'center' }} href={profileData.github}>
            <IconFolderFilled />
            GitHub
          </a>
        </Text>

        <Text>
          <a
            style={{ display: 'flex', alignItems: 'center' }}
            href={profileData.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconFolderFilled />
            Resume
          </a>
        </Text>
      </Group>
      <TextInput
        mt="md"
        withAsterisk
        label="Email"
        placeholder="your@email.com"
        value={profileData.email}
        disabled={true}
      />
      <TextInput
        mt="md"
        withAsterisk
        label="Номер телефона"
        placeholder="+7 99-999-999"
        disabled={true}
        value={profileData.phone}
      />
      <Blockquote mt="xl" color="myColor" cite="– About" icon={icon}>
        {profileData.about}
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
