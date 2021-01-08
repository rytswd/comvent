export interface comventSetup {
  trigger: string
  usersWhitelisted: string[]
  usersBlacklisted: string[]
  keywords: Map<string, string>
}

export interface comventComment {
  username: string
  commentBody: string
}

// A very neat solution from https://fettblog.eu/typescript-hasownproperty/
export function hasProperty<X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

export function isArrayOfStrings(obj: unknown): obj is string[] {
  if (!Array.isArray(obj)) return false
  if (obj.length === 0) return false

  for (const item of obj) {
    if (typeof item !== 'string') {
      return false
    }
  }

  return true
}
