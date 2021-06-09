export interface Ressource {
    id: number,
    name: string,
    description: string,
    creationDate: string,
    creator: {},
    modificationDate: string,
    contentText: string,
    imageUrl: string,
    nbViews: number,
    language: string,
    resourceType: string,
    resourceCategory: string,
    relationshipType: string,
    fileType: string,
    visible: boolean,
    draft: boolean,
    validated: boolean
    fileName:string
}
