import slugifyFn from 'slugify'

type Options = {
  replacement?: string
  remove?: RegExp
  lower?: boolean
  strict?: boolean
  locale?: string
  trim?: boolean
}

const CONFIG: Options = {
  lower: true,
}

const slugify = (string: string) => slugifyFn(string, CONFIG)

export default slugify
