import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import scalarUI from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
//import { env } from '@/env'
import { transformSwaggerSchema } from './transform-swagger-shema'

const server = fastify()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: 'Validation error',
			issues: error.validation,
			request: request.body,
		})
	}

	console.error(error)

	return reply
		.status(500)
		.send({ message: 'Internal Server Error.', error: error })
})

// Permite receber uploads de arquivos (form-data) nas requisições
server.register(fastifyMultipart)

//para documentação
server.register(fastifySwagger, {
	//configurações o swager possui o padrão nomral dele e o openapi
	openapi: {
		info: {
			title: 'Upload Server',
			version: '1.0.0',
		},
	},
	// Define uma função de transformação de schema
	// Converte os schemas (ex: Zod) para JSON Schema antes de serem usados
	transform: transformSwaggerSchema,
})

server.get('/openapi.json', () => server.swagger())

//Utilizando scalaUI
server.register(scalarUI, {
	routePrefix: '/docs',
})

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	// Confirma no console que o servidor está ativo.
	console.log('Hello Word!2')
})
