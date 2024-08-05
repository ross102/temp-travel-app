import FormContainer from '@/components/form/FormContainer';
import { updateProfileAction,updateProfileImageAction, fetchProfile } from '@/utils/actions';
import ImageInputContainer from '@/components/form/ImageInputContainer';
import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';

async function ProfilePage() {
  const profile = await fetchProfile();

  return (
    <section>
      <h1 className='text-2xl text-center font-semibold mb-8 capitalize'>Update User Profile</h1>
      <div className='border mx-auto p-8 rounded-md max-w-lg'>
        {/* image input container */}
          <ImageInputContainer
  image={profile.profileImage}
  name={profile.username}
  action={updateProfileImageAction}
  text='Update Profile Image'
/>;
        <FormContainer action={updateProfileAction}>
          <div className='grid gap-4 mt-4 '>
            <FormInput
              type='text'
              name='firstName'
              label='First Name'
              defaultValue={profile.firstName}
            />
            <FormInput
              type='text'
              name='lastName'
              label='Last Name'
              defaultValue={profile.lastName}
            />
            <FormInput
              type='text'
              name='username'
              label='Username'
              defaultValue={profile.username}
            />
          </div>
          <SubmitButton text='Update Profile' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default ProfilePage;