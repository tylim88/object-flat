import 'jest'
import flatten from './index'

describe('objFlat', () => {
	it('object-flat test"}', () => {
		const a = flatten({ a: 1, b: 2, c: 1 }, '.')

		const b = flatten(
			{ a: 1, b: { c: 3, d: { e: 4 } }, f: { g: { h: 'a', j: [{ a: 1 }] } } },
			'='
		)

		expect(a).toEqual({ a: 1, b: 2, c: 1 })
		expect(b).toEqual({
			a: 1,
			'b=c': 3,
			'b=d=e': 4,
			'f=g=h': 'a',
			'f=g=j': [{ a: 1 }],
		})

		const c: typeof a = { a: 1, b: 2, c: 1 }

		const d: typeof b = {
			a: 1,
			'b=c': 1,
			'b=d=e': 1,
			'f=g=h': '1',
			'f=g=j': [{ a: 1 }],
		}
	})
})
