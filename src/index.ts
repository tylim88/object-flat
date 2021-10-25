// https://stackoverflow.com/questions/69566806/typescript-change-type-to-partialnot-undefined-so-it-wont-trigger-error-2741-b
type IncludePropertyKeys<A, U = undefined> = {
	[P in keyof A]: A[P] extends U ? P : never
}[keyof A]
type ExcludePropertyKeys<A, U = undefined> = {
	[P in keyof A]: A[P] extends U ? never : P
}[keyof A]

type IncludePropertyTypes<A, U = undefined> = {
	[K in IncludePropertyKeys<A, U>]: unknown
}
type ExcludePropertyTypes<A, U = undefined> = {
	[K in ExcludePropertyKeys<A, U>]: unknown
}

type OptionalPropertyType<A, U = undefined> = ExcludePropertyTypes<A, U> &
	Partial<IncludePropertyTypes<A, U>>

export const objExact = <
	T extends { [index: string]: unknown },
	Y extends OptionalPropertyType<T>
>(
	dummyObject: T,
	targetObject: Y
) => {
	const newObj: { [prop: string]: unknown } = {}
	for (const prop in dummyObject) {
		if ((targetObject as { [prop: string]: unknown })[prop] !== undefined) {
			newObj[prop] = (targetObject as { [prop: string]: unknown })[prop]
		}
	}

	return newObj as { [Z in keyof T & keyof Y]: Y[Z] }
}
