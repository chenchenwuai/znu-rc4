import RC4 from '../src/main'

const key = 'hello'
const crypt_data1 = [1,2,3,4]

test('是否正确初始化？', () => {
  const rc4 = new RC4(key)
  expect(rc4.isInit).toBeTruthy()
})