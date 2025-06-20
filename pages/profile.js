import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('../components/ProfileComponent'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-screen"><p>Loading profile...</p></div>
});

const Profile = () => {
  return <ProfilePage />;
}

export default Profile;