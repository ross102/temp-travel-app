'use server';

import { profileSchema, validateWithZodSchema, imageSchema, propertySchema } from './schemas';
import { createClient } from '../lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache';
import { uploadImage } from '@/lib/supabase/supabase';
import db from "./db"
import { date } from 'zod';


const getAuthUser = async () => {
    const supabase = await createClient();
    const { data: { user}, error } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('You must be logged in to access this route');
    }
    return user;
  };

  const renderError = (error: unknown): { message: string } => {
    console.log(error);
    return {
      message: error instanceof Error ? error.message : 'An error occurred',
    };
  };

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const supabase = await createClient();
    const { data: { user}, error } = await supabase.auth.getUser();
    if (!user) throw new Error('Please login to create a profile');
    
    const rawData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rawData);

    await db.profile.create({
        data: {
          supabaseId: user.id,
          email: user.email as string,
          profileImage: '',
          ...validatedFields,
        },
      });

  } catch (error) {
    console.log(error);
    return { message: error instanceof Error ? error.message : 'An error occurred', };
  }
  redirect('/');
};

export const updateProfileImageAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
        const image = formData.get('image') as File;
        const validatedFields = validateWithZodSchema(imageSchema, { image });
        const fullPath = await uploadImage(validatedFields.image);
    
        await db.profile.update({
          where: {
            supabaseId: user.id,
          },
          data: {
            profileImage: fullPath,
          },
        });
        revalidatePath('/profile');
        return { message: 'Profile image updated successfully' };
      } catch (error) {
        return renderError(error);
      }
  };

export async function login(prevState: any, formData: FormData) {
    const supabase = createClient()
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

  export const fetchProfileName = async () => {
   const user = await getAuthUser()
  
    const profile = await db.profile.findUnique({
      where: {
        supabaseId: user.id,
      },
      select: {
        firstName: true,
      },
    });
    return profile?.firstName;
  };

  export const fetchProfile = async () => {
    const user = await getAuthUser();
  
    const profile = await db?.profile?.findUnique({
      where: {
        supabaseId: user.id,
      },
    });
    if (!profile) return redirect('/profile/create');
    return profile;
  };

  export const updateProfileAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
      const rawData = Object.fromEntries(formData);
  
      const validatedFields = validateWithZodSchema(profileSchema, rawData);
    
      await db.profile.update({
        where: {
          supabaseId: user.id,
        },
        data: validatedFields,
      });
      revalidatePath('/profile');
      return { message: 'Profile updated successfully' };
    } catch (error) {
      return renderError(error);
    }
  };
  export const createPropertyAction = async (
    prevState: any,
    formData: FormData
  ): Promise<{ message: string }> => {
    const user = await getAuthUser();
    try {
      const rawData = Object.fromEntries(formData);
      const file = formData.get('image') as File;
  
      const validatedFields = validateWithZodSchema(propertySchema, rawData);
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      const fullPath = await uploadImage(validatedFile.image);
  
      await db.property.create({
        data: {
          ...validatedFields,
          image: fullPath,
          profileId: user.id,
        },
      });
    } catch (error) {
      return renderError(error);
    }
    redirect('/');
  };

  export const fetchProperties = async ({
    search = '',
    category,
  }: {
    search?: string;
    category?: string;
  }) => {
    const properties = await db.property.findMany({
      where: {
        category,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { tagline: { contains: search, mode: 'insensitive' } },
        ],
      },
      select: {
        id: true,
        name: true,
        tagline: true,
        country: true,
        image: true,
        price: true,
      },
    });
    return properties;
  };