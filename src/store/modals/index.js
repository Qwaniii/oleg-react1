import StoreModule from '../module';

class ModalsState extends StoreModule {
  initState() {
    return {
      name: [],
      params: null,
      callback: () => {}
    };
  }

  open(modal) {
    return new Promise((resolve) => {
      const handleModalClose = (result) => {
        this.close()
        resolve(result)
      };
      this.setState({ ...this.getState(), name: [...this.getState().name, modal], callback: handleModalClose }, `Открытие модалки ${modal}`);
    })
  }

  close() {
    const allModal = this.getState().name
    const closeModal = allModal.filter((_modal, index) => index !== allModal.length - 1)
    this.setState({ ...this.getState(), name: closeModal }, `Закрытие модалки ${allModal[allModal.length - 1]}`);
  }




}

export default ModalsState;
