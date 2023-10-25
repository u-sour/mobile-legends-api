const AlertMessage = {
    documentNotFound: `Document not found, look like it is already deleted.\nYou should refresh the page.`,
    disallowDeleteDocHasRelation: (collectionName) => `Sorry, you can't delete this document, it use in ${collectionName} Collection.`
}

export default AlertMessage