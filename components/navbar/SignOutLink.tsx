'use client';

import { useToast } from '../ui/use-toast';
import { Button } from '../ui/button';

function SignOutLink() {
  const { toast } = useToast();
  const handleLogout = () => {
    toast({ description: 'You have been signed out.' });
  };
  return (
    // <SignOutButton redirectUrl='/'>
    //   <button className='w-full text-left' onClick={handleLogout}>
    //     Logout
    //   </button>
    // </SignOutButton>
    <Button>Logout</Button>
  );
}
export default SignOutLink;