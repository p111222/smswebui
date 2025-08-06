import React, { useContext, useEffect } from 'react'
import { AppStore } from '../../../Store/appStore'
import SmsBlockRequest from './SmsBlockRequest';

const Preview = () => {

  const { setIsFieldDisabled } = useContext(AppStore);

  useEffect(() => {

    setIsFieldDisabled(true);

    return () => setIsFieldDisabled(false);
  }, [])

  return (
    <div>

      <SmsBlockRequest />
    </div>
  )
}

export default Preview