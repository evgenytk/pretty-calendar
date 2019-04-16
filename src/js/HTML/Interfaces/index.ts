export interface HTMLAttribute {
	name: string,
	value: string
}

export interface HTMLNodeObject {
	name: string,
	tagName: string,
	attributes: Array<HTMLAttribute>,
	content?: string
}