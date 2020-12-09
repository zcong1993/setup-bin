import { Installer } from '@zcong/actions-installer';
export declare class BinInstaller extends Installer {
    downloadUrl: string;
    getDownloadUrlByVersion(): string;
}
