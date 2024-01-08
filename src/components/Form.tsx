import React, { useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  Code,
  Container,
  MultiSelect,
  TextInput,
  Input,
  Checkbox,
  Stack,
  Radio,
  Title,
  Textarea,
} from '@mantine/core';
import { useForm, hasLength } from '@mantine/form';
import { IconTrashFilled, IconAt } from '@tabler/icons-react';
import AddButton from './shared/AddButton/AddButton';
import MyModal from './shared/Modal/Modal';
import { useProfile } from '../context/ProfileContext';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { submitFormData } from '../redux/slices/FormSlice';

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  resume: string;
  phone: string;
  about: string;
  github: string;
  telegram: string;
  advantages: string;
  advantages2: string;
  advantages3: string;
  file: File | null;
  selectedSex: string[];
  checkboxGroup: string[];
}
interface IFormProps {
  onFormSubmit: (formData: ProfileFormData) => void;
}
const Form: React.FC<IFormProps> = ({ onFormSubmit }) => {
  const { profileData, updateProfileData } = useProfile();
  const dispatch = useDispatch<AppDispatch>();
  const isFetching = useSelector((state: RootState) => state.form.isFetching);
  const isSuccess = useSelector((state: RootState) => state.form.isSuccess);

  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [success, setIsSuccess] = useState(true);

  const form = useForm<ProfileFormData>({
    initialValues: {
      nickname: 'Doe23',
      firstName: 'Doe',
      lastName: 'John',
      email: 'johndoe2024@gmail.com',
      phone: '+7 88-888-888',
      github: 'https://github.com/Emptyyw',
      telegram: 'emptyyw',
      resume: '',
      advantages: 'advantages',
      advantages2: 'advantages-2',
      advantages3: 'advantages-3',
      about: 'I am Frontend ',
      file: null as File | null,
      selectedSex: [],
      checkboxGroup: [],
    },

    validate: values => {
      if (active === 0) {
        return {
          name:
            values.firstName.trim().length < 2
              ? 'Name must include at least 2 characters'
              : null,
          surname:
            values.lastName.trim().length < 2
              ? 'LastName must include at least 2 characters'
              : null,
          nickname:
            values.nickname.trim().length < 2
              ? 'Nickname must be 2 characters long'
              : null,
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
        };
      }

      if (active === 1) {
        return {
          name:
            values.firstName.trim().length < 2
              ? 'Name must include at least 2 characters'
              : null,
        };
      }
      return {};
    },
  });

  const nextStep = () =>
    setActive(current => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < 3 ? current + 1 : current;
    });

  const prevStep = () => setActive(current => (current > 0 ? current - 1 : current));

  const handleSubmit = async () => {
    try {
      if (!form.validate().hasErrors) {
        const action = await dispatch(submitFormData(form.values));

        if (submitFormData.fulfilled.match(action)) {
          const responseData = action.payload;
          console.log(responseData);
          updateProfileData(responseData);
          setIsSuccess(true);
        }
      }
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleFileChange = (file: File | null) => {
    console.log('File in form:', file);
    form.setFieldValue('file', file);
  };

  const handleCheck = (value: string) => {
    const isSelected = form.values.checkboxGroup.includes(value);
    if (isSelected) {
      form.setFieldValue(
        'selectedAdvantages',
        form.values.checkboxGroup.filter(v => v !== value),
      );
    } else {
      form.setFieldValue('checkboxGroup', [...form.values.checkboxGroup, value]);
    }
  };

  console.log(form.values);

  return (
    <Container size="md">
      <Stepper iconSize={32} active={active}>
        <Stepper.Step>
          <TextInput
            label="Nickname"
            placeholder="nickname"
            {...form.getInputProps('nickname')}
          />

          <TextInput
            mt="md"
            label="Name"
            placeholder="name"
            {...form.getInputProps('firstName')}
          />
          <TextInput
            mt="md"
            label="Surname"
            placeholder="surname"
            {...form.getInputProps('lastName')}
          />
          <TextInput
            mt="md"
            label="Email"
            placeholder="example@gmail.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            mt="md"
            label="Phone"
            placeholder="+7 99-999-999"
            {...form.getInputProps('phone')}
          />

          <MultiSelect
            mt="md"
            maxValues={1}
            label="Sex"
            placeholder="Pick value"
            data={[
              { value: 'man', label: 'Man' },
              { value: 'woman', label: 'Woman' },
            ]}
            value={form.values.selectedSex}
            onChange={selected => form.setFieldValue('selectedSex', selected)}
          />
        </Stepper.Step>

        <Stepper.Step>
          <Input.Wrapper label="Advantages">
            <TextInput
              placeholder="Placeholder"
              {...form.getInputProps('advantages')}
              mt="md"
              rightSection={
                <IconTrashFilled
                  aria-label="Clear input"
                  onClick={() => form.setFieldValue('advantages', '')}
                  style={{ display: form.values.advantages ? undefined : 'none' }}
                />
              }
            />
            <TextInput
              placeholder="Placeholder"
              {...form.getInputProps('advantages2')}
              mt="md"
              rightSection={
                <IconTrashFilled
                  aria-label="Clear input"
                  onClick={() => form.setFieldValue('advantages2', '')}
                  style={{ display: form.values.advantages2 ? undefined : 'none' }}
                />
              }
            />
            <TextInput
              placeholder="Placeholder"
              {...form.getInputProps('advantages3')}
              mt="md"
              rightSection={
                <IconTrashFilled
                  aria-label="Clear input"
                  onClick={() => form.setFieldValue('advantages3', '')}
                  style={{ display: form.values.advantages3 ? undefined : 'none' }}
                />
              }
            />
          </Input.Wrapper>
          <AddButton onChange={handleFileChange} />
          <Stack>
            <Title order={5} pt="md">
              Checkbox group
            </Title>
            {['Checkbox-true', 'Checkbox2-true', 'Checkbox3-true'].map(
              (checkboxName, index) => (
                <Checkbox
                  key={index}
                  checked={form.values.checkboxGroup.includes(checkboxName)}
                  onChange={() => handleCheck(checkboxName)}
                  label={`Checkbox ${index + 1}`}
                  name={`checkbox-${index + 1}`}
                />
              ),
            )}
          </Stack>
          <Stack>
            <Title order={5} pt="md">
              Radio group
            </Title>
            {['Radio-true', 'Radio2-true', 'Radio3-true'].map((radioName, index) => (
              <Radio
                key={index}
                checked={form.values.checkboxGroup.includes(radioName)}
                onChange={() => handleCheck(radioName)}
                label={`Checkbox ${index + 1}`}
                name={`checkbox-${index + 1}`}
              />
            ))}
          </Stack>
        </Stepper.Step>

        <Stepper.Step>
          <TextInput
            mt="md"
            label="GitHub"
            placeholder="GitHub"
            {...form.getInputProps('github')}
          />
          <TextInput
            leftSection={<IconAt size={16} />}
            mt="md"
            label="Telegram"
            placeholder="Telegram username"
            {...form.getInputProps('telegram')}
          />
          <TextInput
            mt="md"
            label="Resume"
            placeholder="Resume"
            {...form.getInputProps('resume')}
          />
          <Textarea
            mt="xl"
            placeholder="Placeholder"
            label="About"
            autosize
            minRows={2}
            {...form.getInputProps('about')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {form.values.file && (
              <>
                <div>File Name: {form.values.file.name}</div>
                <br />
              </>
            )}
            {JSON.stringify(form.values, null, 4)}
          </Code>
        </Stepper.Completed>
      </Stepper>
      <Group justify="space-between" mt="xl">
        {active !== 0 && (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}

        {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
        {active === 3 && (
          <>
            <Button onClick={handleSubmit}>Отправить</Button>
            {modalOpen && <MyModal onClose={closeModal} success={isSuccess} />}
          </>
        )}
      </Group>
    </Container>
  );
};

export default Form;
