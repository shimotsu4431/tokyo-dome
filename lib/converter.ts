export type AreaData = {
  name: string
  isRegistered: boolean
  area: number
  prefId: number
  createdAt: number
  updatedAt: number
}
type docId = {
  docId: string
}
export type UnionAreaData = AreaData & docId

function assertAreaData(data: Readonly<AreaData>): asserts data is AreaData {
  const d = data as Readonly<AreaData> // 補完のためキャスト
  if (
    !(
      typeof d.name === 'string' &&
      typeof d.isRegistered === 'boolean' &&
      typeof d.area === 'number' &&
      typeof d.prefId === 'number' &&
      typeof d.createdAt === 'object' &&
      typeof d.updatedAt === 'object'
    )
  ) {
    throw new Error('data is not AreaData type')
  }
}

const areaDataConverter: firebase.firestore.FirestoreDataConverter<AreaData> = {
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options)
    assertAreaData(data)
    return data
  },
  toFirestore: (model: AreaData) => model,
}
