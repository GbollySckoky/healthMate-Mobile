import React, { useCallback, useState } from 'react'

const useDisplay = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleDisplay = useCallback(() => {
        setOpenModal((prev) => !prev)
    },[])
  return {
    openModal,
    handleDisplay
  }
}

export default useDisplay