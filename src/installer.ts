import { Installer } from '@zcong/actions-installer'

export class BinInstaller extends Installer {
  downloadUrl: string

  getDownloadUrlByVersion(): string {
    return this.downloadUrl
  }
}
