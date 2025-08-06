import React, { useContext, useEffect } from 'react'
import { AppStore } from '../../../Store/appStore'
import MpinGenerationRequest from './MpinGenerationRequest';

const Preview = () => {

  console.log("hellooooooooooo bitchhhhh");
  
  const { setIsFieldDisabled } = useContext(AppStore);

  useEffect(() => {

    setIsFieldDisabled(true);

    return () => setIsFieldDisabled(false);
  }, [])

  return (
    <div>
      <MpinGenerationRequest />
    </div>
  )
}

export default Preview