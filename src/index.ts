type DeepKey<T, K extends keyof T, J extends string> = K extends string
	? T[K] extends Record<string, unknown>
		? `${K}${J}${DeepKey<T[K], keyof T[K], J>}`
		: K
	: never

type DeepKeyS<T, J extends string> = DeepKey<T, keyof T, J>

type DeepValue<
	T,
	J extends string,
	P extends DeepKeyS<T, J>
> = P extends `${infer K}${J}${infer Rest}`
	? K extends keyof T
		? Rest extends DeepKeyS<T[K], J>
			? DeepValue<T[K], J, Rest>
			: never
		: never
	: P extends keyof T
	? T[P]
	: never

type ObjectFlatten<T extends Record<string, unknown>, J extends string> = {
	[TKey in DeepKeyS<T, J>]: DeepValue<T, J, TKey>
}

export const flatten = <
	T extends Record<string, unknown>,
	J extends string = '.'
>(
	object: T,
	join: J
) => {
	let obj = {}

	const flat = (object: Record<string, unknown>, key: string) => {
		for (const prop in object) {
			const newKey = (key ? key + join : key) + prop
			if (
				typeof object[prop] === 'object' &&
				object[prop] !== null &&
				// https://stackoverflow.com/questions/1173549/how-to-determine-if-an-object-is-an-object-literal-in-javascript
				Object.getPrototypeOf(object[prop]) === Object.prototype
			) {
				flat(object[prop] as Record<string, unknown>, newKey)
			} else {
				obj = { ...obj, [newKey]: object[prop] }
			}
		}
	}

	flat(object, '')

	return obj as ObjectFlatten<T, J>
}

export default flatten
