import { NotionAPI } from 'notion-client'

// Notion's private API now returns records as
// `{ value: { value: block, role } }` instead of `{ value: block, role }`.
// react-notion-x and notion-client 7 read `record.value` as the block.
type NotionRecordEntry = {
  role?: string
  value?: {
    id?: string
    type?: string
    role?: string
    value?: {
      id?: string
      type?: string
    }
  }
}

function unwrapRecordEntry(entry: NotionRecordEntry) {
  const inner = entry?.value
  const block = inner?.value

  if (!inner || !block || (!block.id && !block.type)) {
    return entry
  }

  return {
    ...entry,
    role: inner.role ?? entry.role,
    value: block
  }
}

function normalizeNotionResponse(response: unknown) {
  if (!response || typeof response !== 'object') {
    return
  }

  const recordMap = (response as { recordMap?: Record<string, unknown> })
    .recordMap

  if (!recordMap || typeof recordMap !== 'object') {
    return
  }

  for (const table of Object.values(recordMap)) {
    if (!table || typeof table !== 'object') {
      continue
    }

    const records = table as Record<string, NotionRecordEntry>

    for (const id of Object.keys(records)) {
      const entry = records[id]

      if (!entry || typeof entry !== 'object') {
        continue
      }

      records[id] = unwrapRecordEntry(entry)
    }
  }
}

class CompatibleNotionAPI extends NotionAPI {
  override async fetch<T>(
    ...args: Parameters<NotionAPI['fetch']>
  ): Promise<T> {
    const response = await super.fetch<T>(...args)
    normalizeNotionResponse(response)
    return response
  }
}

export const notion = new CompatibleNotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})
