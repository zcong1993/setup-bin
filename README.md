# Setup bin

> curl {url} && untar && add to path for github actions with cache

## Usage

now support `.7z`, `.zip` and `tar`

### common options

| option   | required | description                                              |
| -------- | -------- | -------------------------------------------------------- |
| name     | true     | Name present the binary                                  |
| bin-path | false    | Binary file relative path, default ./                    |
| test-cmd | false    | Use for test if binary install success, eg: hugo version |

### Direct mode

pass `download-url` directly.

The action will download asset from the given url and unzip it directly.

| option       | required | description                  |
| ------------ | -------- | ---------------------------- |
| bin-version  | true     | Binary version as cache key  |
| download-url | true     | Binary resource download url |

```yaml
- uses: zcong1993/setup-bin@master
  with:
    download-url: https://github.com/zcong1993/changed-files/releases/download/v0.1.2/changed-files_0.1.2_linux_amd64.tar.gz
    name: changed-files
    bin-version: '0.1.2'
    test-cmd: changed-files -v
```

### Github Release mode

get github release by passing `repo-full` and `tag-version`, then find asset by `matcher` regexp.

| option      | required | description                                                                 |
| ----------- | -------- | --------------------------------------------------------------------------- |
| repo-full   | true     | Download github release, owner/repo, eg: gohugoio/hugo                      |
| tag-version | true     | Github release tag name or latest                                           |
| matcher     | true     | Regex use for detect which asset should download, eg: "Linux-64bit.tar.gz$" |

```yaml
- name: test github release
  uses: zcong1993/setup-bin@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    name: hugo-861
    repo-full: gohugoio/hugo
    tag-version: v0.86.1
    matcher: Linux-64bit.tar.gz$
    test-cmd: hugo version
- name: test github release latest
  uses: zcong1993/setup-bin@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    name: hugo
    repo-full: gohugoio/hugo
    tag-version: latest
    matcher: Linux-64bit.tar.gz$
    test-cmd: hugo version
```

## License

MIT &copy; zcong1993
