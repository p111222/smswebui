import React, { useContext, useEffect } from 'react'
import BasicDetails from './BasicDetails'
import { AppStore } from '../../../Store/appStore'

const Preview = () => {

  const {setIsFieldDisabled} = useContext(AppStore);

  useEffect(()=>{

    setIsFieldDisabled(true);

    return () => setIsFieldDisabled(false);
  },[])

  return (
    <div>
      
    <BasicDetails />
    </div>
  )
}

export default Preview