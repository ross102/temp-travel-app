'use server';

import { profileSchema } from './schemas';
import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    const validatedFields = profileSchema.parse(rawData);
    console.log(validatedFields);
    return { message: 'Profile Created' };
  } catch (error) {
    console.log(error);
    return { message: 'there was an error...' };
  }
};

export async function login(prevState: any, formData: FormData) {
    const supabase = createClient()
    console.log(formData);
    const email = formData?.get('Email') as string
    const {error} : any = supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true
      }
    })
    if (error) {
      return {
        error: true,
        message: 'Error authenticating!'
      }
    }
  
    return {
      message: `Email sent to ${email}`
    }
   
  }
  
  export async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    redirect('/login')
  }