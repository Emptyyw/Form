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
import { useForm } from '@mantine/form';
import { IconTrashFilled, IconAt } from '@tabler/icons-react';
import AddButton from './shared/AddButton/AddButton';
import MyModal from './shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { ProfileState } from '../redux/slices/ProfileSlice';
import { Steps } from '../enums/Enums';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/store';
import { submitFormData } from '../redux/slices/FormSlice';
import { UserInfo } from '../types/Types';
import { updateProfileInfo } from '../redux/slices/ProfileSlice';
interface IFormProps {
  onFormSubmit: (formData: ProfileState) => void;
}

const Form: React.FC<IFormProps> = ({ onFormSubmit }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const formValues = useSelector((state: RootState) => state.form);
  const modalSuccess = useSelector((state: RootState) => state.modal);

  const form = useForm<UserInfo>({
    initialValues: {
      nickname: 'Doe23',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe2024@gmail.com',
      phone: '+7 88-888-888',
      github: 'https://github.com/Emptyyw',
      telegram: 'emptyyw',
      resume: '',
      advantages: 'advantages',
      advantages2: 'advantages-2',
      advantages3: 'advantages-3',
      about: 'I am Frontend ',
      file: null,
      selectedSex: formValues.selectedSex || [],
      checkboxGroup: formValues.checkboxGroup || [],
    },

    validate: values => {
      if (active === Steps.First) {
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

      if (active === Steps.Second) {
        return {};
      }
      return {};
    },
  });

  const nextStep = () =>
    setActive(current => {
      if (form.validate().hasErrors) {
        return current;
      }
      return current < Steps.Fourth ? current + Steps.Second : current;
    });

  const prevStep = () =>
    setActive(current => (current > Steps.First ? current - Steps.Second : current));

  useEffect(() => {
    if (formValues.isSuccess) {
      dispatch(updateProfileInfo(form.values));
      form.reset();
    }
  }, [formValues.isSuccess, form.values, dispatch, form]);

  const handleSubmit = async () => {
    dispatch(submitFormData(form.values));
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

  return (
    <Container size="md">
      <Stepper iconSize={32} active={active}>
        <Stepper.Step>
          <TextInput label="Nickname" {...form.getInputProps('nickname')} />

          <TextInput mt="md" label="FirstName" {...form.getInputProps('firstName')} />
          <TextInput mt="md" label="LastName" {...form.getInputProps('lastName')} />
          <TextInput mt="md" label="Email" {...form.getInputProps('email')} />
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
          <TextInput mt="md" label="GitHub" {...form.getInputProps('github')} />
          <TextInput
            leftSection={<IconAt size={16} />}
            mt="md"
            label="Telegram"
            placeholder="Telegram username"
            {...form.getInputProps('telegram')}
          />
          <TextInput mt="md" label="Resume" {...form.getInputProps('resume')} />
          <Textarea
            mt="xl"
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
                <Code>File Name: {form.values.file.name}</Code>
                <br />
              </>
            )}
            {JSON.stringify(form.values, null, 4)}
          </Code>
        </Stepper.Completed>
      </Stepper>
      <Group justify="space-between" mt="xl">
        {active !== Steps.First && (
          <Button variant="outline" onClick={prevStep}>
            Back
          </Button>
        )}

        {active !== Steps.Fourth && <Button onClick={nextStep}>Next step</Button>}
        {active === Steps.Fourth && (
          <>
            <Button onClick={handleSubmit}>Отправить</Button>
            <MyModal />
          </>
        )}
      </Group>
    </Container>
  );
};

export default Form;
