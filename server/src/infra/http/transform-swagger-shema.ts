import { jsonSchemaTransform } from 'fastify-type-provider-zod'

// tipo só do body (bem simples)
type BodySchema = {
	type?: string
	required: string[]
	properties: Record<string, unknown>
}

//o que ele faz traz os tipos de parametros que uma função recebe, e pego o primeiro parametro do jsonSchemaTransform
type transformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0]

// função criada pra transformar meu schemas de arquivos
export function transformSwaggerSchema(data: transformSwaggerSchemaData) {
	//No caso tudo ta igual só pego uma função e repasso para ela mesma, mais com isso da para criar condições, e isso influencia nas rotas de arquivos
	const { schema, url } = jsonSchemaTransform(data)

	//o consumes da rota
	//Esse é ? e para verificar se existe
	if (schema.consumes?.includes('multipart/form-data')) {
		if (schema.body === undefined) {
			schema.body = {
				type: 'object',
				required: [],
				properties: {},
			}
		}

		const body = schema.body as BodySchema

		body.properties.file = {
			type: 'string',
			format: 'binary',
		}

		body.required.push('file')
	}

	return { schema, url }
}
