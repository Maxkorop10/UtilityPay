import { Label } from '@radix-ui/react-label';
import ProfileInfo from '@/src/modules/profile-info/profile-info';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Особистий профіль',
};

export default function ProfilePage() {
  return (
    <div className="rounded-[10px] shadow-md h-fit w-[100%] p-6 bg-white">
      <Label className="font-bold text-2xl">Особистий профіль</Label>
      <ProfileInfo />
    </div>
  );
}
