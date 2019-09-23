export class Avatar {
    constructor(
        public name: string,
        public type: string,
        public resource: string, // string of array of byte
    ) {
    }

    static Blob(avatar: Avatar): Blob {
        const byteString = window.atob(avatar.resource);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
            int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], {type: 'image/' + avatar.type});
        return blob;
    }
}
