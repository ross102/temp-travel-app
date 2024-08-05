import { LuUser2 } from 'react-icons/lu';
import { fetchProfileName} from '@/utils/actions';

async function UserIcon() {
 const profileName = await fetchProfileName();

  if (profileName)
    return (
    <div className='flex text-center gap-2 '>
        <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />
        {/* <span className='mr-2'>{profileName}</span> */}
    </div>
    );
  return <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;