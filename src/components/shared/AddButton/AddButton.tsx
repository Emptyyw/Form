import { FC, useState } from 'react';
import { Button, Group, Text, FileButton } from '@mantine/core';

interface AddButtonProps {
  onChange: (file: File | null) => void;
  value?: File | null;
  onChange: (value: File | null) => void;
}

const AddButton: FC<AddButtonProps> = ({ onChange }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    onChange(selectedFile);
  };

  return (
    <>
      <Group justify='start' mt='sm'>
        <FileButton onChange={handleFileChange} accept='image/png,image/jpeg'>
          {(props) => <Button {...props}>+</Button>}
        </FileButton>
      </Group>

      {file && (
        <Text size='sm' ta='start' mt='sm'>
          Picked file: {file.name}
        </Text>
      )}
    </>
  );
};

export default AddButton;
