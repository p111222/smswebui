import React, { useContext, useEffect } from 'react'
import { AppStore } from '../../../Store/appStore'
import PhoneNumberRequest from './PhoneNumberRequest';

const Preview = () => {

  const { setIsFieldDisabled } = useContext(AppStore);

  useEffect(() => {

    setIsFieldDisabled(true);

    return () => setIsFieldDisabled(false);
  }, [])

  return (
    <div>

      <PhoneNumberRequest />
    </div>
  )
}

export default Preview