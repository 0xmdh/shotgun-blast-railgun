import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn', () => {
  it('joins classes', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('merges tailwind classes', () => {
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
})
