"use client"

import FormInput from '@/components/form/FormInput';
import { SubmitButton } from '@/components/form/Buttons';
import FormContainer from '@/components/form/FormContainer';
import { createProfileAction } from '@/utils/actions';
import { login } from "@/utils/actions";

const initialState = {
    message: '',
    error: false
  }

function LoginPage() {
   


  return (
    <section>
      <div className='border p-8 mx-auto rounded-md max-w-lg'>
      <h1 className="text-2xl text-center font-semibold">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center dark:text-gray-400">
          Enter your email to sign in/create your account. No password is required.
        </p>
        <FormContainer action={login}>
          <div className='grid gap-2 mt-2 '>
            <FormInput type='email' name='Email' label='Email' />
          </div>
          {/* <p className={`${state?.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
      {state?.message}
    </p> */}
          <SubmitButton text='Sign in with email' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}
export default LoginPage;