import React, { useCallback, useState } from 'react'

const useDisplayModal = () => {
    const [openModal, setOpenModal] = useState(false)

    const handleOpenModal = useCallback(() => {
        setOpenModal((prev) => !prev)
    },[])
  return {
    openModal,
    handleOpenModal
  }
}

export default useDisplayModal