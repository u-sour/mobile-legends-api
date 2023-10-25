const AlertMessage = {
  createSuccess: 'Document has been created.',
  editSuccess: 'Document has been edited.',
  deleteConfirm: 'Confirmation: Are you sure?',
  deleteSuccess: (_id: string) => `Document (${_id}) has been deleted.`
}

export default AlertMessage
