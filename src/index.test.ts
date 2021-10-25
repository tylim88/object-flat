import 'jest'
import { objExact } from './index'
import { expectType } from 'tsd'

describe('objSwap', () => {
	it('object-flatten test"}', () => {
		const a = objExact(
			{ a: 1, b: 2 },
			{ a: 'hello', b: false as const, c: '!' }
		)

		const b = objExact({ a: 1, b: undefined }, { a: 'hello', b: 123, c: '!' })

		const c = objExact({ a: 1, b: undefined }, { a: 'hello', c: '!' })
		expect(a).toEqual({ a: 'hello', b: false })
		expect(b).toEqual({ a: 'hello', b: 123 })
		expect(c).toEqual({ a: 'hello' })
		expect(() => expectType<{ a: string; b: boolean }>(a)).not.toThrow()
		expect(() => expectType<{ a: string; b: number }>(b)).not.toThrow()
		expect(() => expectType<{ a: string }>(c)).not.toThrow()
	})
})
