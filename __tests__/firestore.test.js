// エミュレーターホスト指定
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080'

// ローカルファイル操作用Nodeモジュール
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
// Firebase SDK テストユーティリティ
// eslint-disable-next-line @typescript-eslint/no-var-requires
const firebase = require('@firebase/rules-unit-testing')

// FirebaseのProject ID
const PROJECT_ID = 'tokyo-dome'

// テスト開始時に1回だけ実行される
beforeAll(async () => {
  // ローカルにあるRulesファイルを読み込む
  const rules = fs.readFileSync('firestore.rules', 'utf8')
  await firebase.loadFirestoreRules({ projectId: PROJECT_ID, rules })
})

// テスト終了前に1回だけ実行される
afterAll(async () => {
  // エミュレーター上に作られたアプリ情報を全て消去する
  await Promise.all(firebase.apps().map((app) => app.delete()))
})

// Firestoreの初期化
function getAuthedFirestore(auth) {
  return firebase.initializeTestApp({ projectId: PROJECT_ID, auth }).firestore()
}

describe('最初のテスト', () => {
  // テストが完了する度データをクリア
  afterEach(async () => {
    await firebase.clearFirestoreData({ projectId: PROJECT_ID })
  })

  test('GET', async () => {
    const db = getAuthedFirestore({ uid: 'shimotsu' })
    const collectionRef = db.collection('1')
    // 全件取得出来ること
    await firebase.assertSucceeds(collectionRef.get())
  })
})
