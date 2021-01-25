export default class ZnuRC4 {
    private _is_inited;
    private _Sbox;
    private _Sbox_index_i;
    private _Sbox_index_j;
    constructor(key: any);
    crypt(crypt_data: any): number[];
    destroy(): void;
}
