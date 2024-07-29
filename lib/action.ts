
// 'use server'
// import { redirect } from 'next/navigation'
// import { createClient } from './supabase/server'
// export async function login(prevState: any, formData: any) {
//     const supabase = createClient()
//     const email = formData.get('email')
//     const {error}: any = supabase.auth.signInWithOtp({
//       email,
//       options: {
//         shouldCreateUser: true
//       }
//     })
//     if (error) {
//       return {
//         error: true,
//         message: 'Error authenticating!'
//       }
//     }
  
//     return {
//       message: `Email sent to ${email}`
//     }
   
//   }
  
//   export async function signOut() {
//     const supabase = createClient()
//     const { error } = await supabase.auth.signOut()
//     redirect('/login')
//   }