export const useModal = () => {
    const modal = ref(false)

    const openModal = () => {
        modal.value = true
    }
    const closeModal = () => {
        modal.value = false
    }

    return {
        modal, openModal, closeModal
    }
}