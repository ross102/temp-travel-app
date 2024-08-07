import { FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { getAuthUser, fetchFavoriteId } from "@/utils/actions"
import { redirect } from 'next/navigation';
import FavoriteToggleForm from "./FavoriteToggleForm"



async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
  const user = await getAuthUser();
  
  if(!user) {
    return 
  }
  const favoriteId = await fetchFavoriteId({ propertyId }) ?? ''

  return <FavoriteToggleForm favoriteId={favoriteId} propertyId={propertyId} />


}
export default FavoriteToggleButton;