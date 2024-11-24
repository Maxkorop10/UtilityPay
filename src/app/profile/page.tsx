import { Label } from '@radix-ui/react-label';
import ProfileInfo from '@/src/modules/profile-info/profile-info';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'Особистий профіль',
};

export default async function ProfilePage() {
  const response = await fetch(process.env.URL + '/api/profile', {
    headers: { Cookie: cookies().toString() },
  });

  const profileInfo: {
    fullname: string;
    phone: string;
    addresses: {
      address: string;
      id: number;
      userId: number;
    }[];
  } = await response.json();
  console.log(profileInfo);

  return (
    <div className="rounded-[10px] shadow-md h-fit w-full p-6 bg-white">
      <Label className="font-bold text-2xl">Особистий профіль</Label>
      <ProfileInfo profileInfo={profileInfo} />
    </div>
  );
}
