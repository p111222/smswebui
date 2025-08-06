import React, { useContext, useEffect } from 'react'
import SmsOptInOut from './SmsOptInOut'
import { AppStore } from '../../../Store/appStore'

const Preview = () => {

  const {setIsFieldDisabled} = useContext(AppStore);

  useEffect(()=>{

    setIsFieldDisabled(true);

    return () => setIsFieldDisabled(false);
  },[])

  return (
    <div>
      
    <SmsOptInOut />
    </div>
  )
}

export default Preview