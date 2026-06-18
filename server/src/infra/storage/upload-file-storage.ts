import { randomUUID } from 'node:crypto'
import { basename, extname } from 'node:path'
import { Readable } from 'node:stream'
import { Upload } from '@aws-sdk/lib-storage'
import z from 'zod'
import { env } from '@/env'
import { r2 } from './client'

const uploadFileToStorageInput = z.object({
	//para selecionar uma pasta
	folder: z.enum(['images', 'dowloads']),
	fileName: z.string(), // e o nome do arquivo no sistema do usuario
	contentType: z.string(),
	contentStream: z.instanceof(Readable),
})

type uploadFileToStorageInput = z.input<typeof uploadFileToStorageInput>

export async function uploadFileToStorage(input: uploadFileToStorageInput) {
	const { folder, fileName, contentType, contentStream } =
		uploadFileToStorageInput.parse(input)

	//função para tirar formatação inapropriada no nome do arquivo do usuario

	//para pegar a extensão
	const fileExtension = extname(fileName)

	//pegar o nome basico o nome
	const fileNameWithoutExtension = basename(fileName)

	//removeendo tudo que não e caracter// usando um função regex pegando de a-z e A-Z e 0-9 /g que e global
	const sanitizedFileName = fileNameWithoutExtension.replace(
		/[^a-zA-Z0-9]/g,
		''
	)

	//juntando extensão e nome formatado
	const sanitizedFileNameWithExtension = sanitizedFileName.concat(fileExtension)

	//para evitar duplicação preciso criar um nome unico de arquivo
	const uniqueFileName = `${folder}${randomUUID()}-${sanitizedFileNameWithExtension}`

	new Upload({
		client: r2,
		params: {
			Key: uniqueFileName,
			Bucket: env.CLOUDFLARE_BUCKET,
			Body: contentStream,
			ContentType: contentType,
		},
	})

	//esse upload demora para fazer se eu quero aguardar do um await

	//await upload.done()

	return {
		key: uniqueFileName,
		url: new URL(uniqueFileName, env.CLOUDFLARE_PUBLIC_URL).toString(),
	}
}
