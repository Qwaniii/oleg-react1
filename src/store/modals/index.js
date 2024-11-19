import StoreModule from '../module';

class ModalsState extends StoreModule {
  initState() {
    return {
      modal: [],
    };
  }

  open(name) {

    const windows = this.getState().modal

    return new Promise((resolve) => {
      const id = name + window.length + 1
      const handleModalClose = (result) => {
        if (result) {
          const close = windows.filter(window => window.id !== id)
          this.setState({ ...this.getState(), modal: close})
          resolve(result)
        } else resolve("close")
      };

      this.setState({ ...this.getState(), modal: [...windows, {id, name, callback: handleModalClose}] }, `Открытие модалки ${name}`);
    })
  }

  close() {
    const allModal = this.getState().name
    const closeModal = allModal.filter((_modal, index) => index !== allModal.length - 1)
    this.setState({ ...this.getState(), name: closeModal }, `Закрытие модалки ${allModal[allModal.length - 1]}`);
  }




}

export default ModalsState;
