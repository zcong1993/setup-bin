# Setup bin

> curl {url} && untar && add to path for github actions with cache

## Usage

now support `.7z`, `.zip` and `tar`

| option       | required | description                           |
| ------------ | -------- | ------------------------------------- |
| name         | true     | Binary name                           |
| bin-version  | true     | Binary version as cache key           |
| download-url | true     | Binary resource download url          |
| bin-path     | false    | Binary file relative path, default ./ |

## Examples

```yaml
- uses: zcong1993/setup-bin@v0.2.0
  with:
    download-url: https://github.com/zcong1993/changed-files/releases/download/v0.1.2/changed-files_0.1.2_linux_amd64.tar.gz
    name: changed-files
    bin-version: '0.1.2'
- name: test setup
  run: changed-files -v
```

## License

MIT &copy; zcong1993
