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
  Flex,
} from '@mantine/core';
import { IconFolderFilled, IconInfoCircle } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

const Profile: React.FC = () => {
  const { firstName, lastName, telegram, github, resume, email, phone, about } =
    useSelector((state: RootState) => state.profile.userInfo);

  return (
    <Container size='md'>
      <Group mt='md'>
        <Avatar radius='xxl' size='xl' color='myColor'>
          {firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'АИ'}
        </Avatar>

        <Text
          size='xl'
          variant='gradient'
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {firstName}
        </Text>
        <Text
          size='xl'
          variant='gradient'
          gradient={{ from: 'grape', to: 'yellow', deg: 149 }}
        >
          {lastName}
        </Text>
      </Group>
      <Group mt='md'>
        <Anchor
          href={`https://t.me/${telegram}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          <Flex>
            <IconFolderFilled />
            Telegram
          </Flex>
        </Anchor>

        <Anchor href={github}>
          <Flex>
            <IconFolderFilled />
            GitHub
          </Flex>
        </Anchor>

        <Anchor href={resume} target='_blank' rel='noopener noreferrer'>
          <Flex>
            <IconFolderFilled />
            Resume
          </Flex>
        </Anchor>
      </Group>
      <TextInput
        mt='md'
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        value={email}
        disabled={true}
      />
      <TextInput
        mt='md'
        withAsterisk
        label='Номер телефона'
        placeholder='+7 99-999-999'
        disabled={true}
        value={phone}
      />
      <Blockquote mt='xl' color='myColor' cite='– About' icon={<IconInfoCircle />}>
        {about}
      </Blockquote>

      <Link to='/form'>
        <Button mt='md' variant='filled' size='md'>
          Начать
        </Button>
      </Link>
    </Container>
  );
};

export default Profile;
