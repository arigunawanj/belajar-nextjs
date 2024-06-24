import Image from 'next/image'
import profilePic from '../public/me.png'
 
export default function Page() {
  return (
    <Image
      src={profilePic}
      alt="Picture of the author"
      width={500} otomatis di provide
      // height={500} otomatis di provide
      // blurDataURL="data:..." otomatis di provide
      // placeholder="blur" // opsi blur-up ketika load image
    />
  )
}