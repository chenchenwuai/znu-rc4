export default class ZnuRC4 {
  public isInit = false // 是否已经初始化

  private _Sbox: number[] = [] // Sbox 状态盒子
  private _Sbox_index_i = 0
  private _Sbox_index_j = 0

  constructor(key: any) {
    try {
      if (key === null || key === undefined || typeof key !== 'string' || key === '') {
        throw new Error('RC4 Error: Key is an illegal format.')
      }
      let j = 0
      for (let i = 0; i < 256; i++) {
        this._Sbox[i] = i
        j = (j + i + key.charCodeAt(i % key.length)) % 256;
        [this._Sbox[i], this._Sbox[j]] = [this._Sbox[j], this._Sbox[i]]
      }
      this.isInit = true
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * 数据的加解密
   * 加密
   * @params type array (原始字符串对每个字符转换为 ascii码 组成的数组)
   * @return type array
   */
  crypt(crypt_data:any):number[] {
    try {
      if (this.isInit !== true) {
        throw new Error('RC4 Error: RC4 is not init.')
      }
      if (Object.prototype.toString.call(crypt_data) === '[object Array]') {
        for (let k = 0; k < crypt_data.length; k++) {
          this._Sbox_index_i = (this._Sbox_index_i + 1) % 256
          this._Sbox_index_j = (this._Sbox_index_j + this._Sbox[this._Sbox_index_i]) % 256;
          [this._Sbox[this._Sbox_index_i], this._Sbox[this._Sbox_index_j]] = [this._Sbox[this._Sbox_index_j], this._Sbox[this._Sbox_index_i]]
          const t = (this._Sbox[this._Sbox_index_i] + this._Sbox[this._Sbox_index_j]) % 256
          crypt_data[k] = crypt_data[k] ^ this._Sbox[t]
        }
        return crypt_data
      } else {
        throw new Error('RC4 Error: Crypt data is an illegal format.')
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  /**
   * 销毁实例
   */
  destroy(): void{
    this.isInit = false
    this._Sbox = []
    this._Sbox_index_i = 0
    this._Sbox_index_j = 0
  }
}
