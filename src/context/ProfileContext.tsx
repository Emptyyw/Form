import { createContext, useContext, ReactNode, useState } from 'react';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume: string;
  about: string;
  advantages: string;
  github: string;
  telegram: string;
  file: File | null;
}

interface ProfileContextProps {
  children: ReactNode;
}

interface ProfileContextValue {
  profileData: ProfileData;
  updateProfileData: (newData: Partial<ProfileData>) => void;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC<ProfileContextProps> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: 'Иван',
    lastName: 'Иванов',
    email: 'example@gmail.com',
    phone: '+7 99-999-999',
    resume: '',
    github: '',
    advantages: '',
    telegram: '',
    about: '',
    file: null,
  });

  const updateProfileData = (newData: Partial<ProfileData>) => {
    setProfileData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('err');
  }
  return context;
};
