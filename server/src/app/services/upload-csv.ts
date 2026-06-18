import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { stringify } from 'csv-stringify'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { uploadFileToStorage } from '@/infra/storage/upload-file-storage'
import { type Either, makeRight } from '@/shared/either'

//aqui temos que tipar nosso retorno
type exportUploadsOutput = {
	//aqui vai ser simples que só vou retornar meu arquivo de exportação
	reportUrl: string
}

//aqui no caso o either espera o error e o sucesso o t e u
export async function exportShortenedurl(): Promise<Either<never, exportUploadsOutput>> {
	

	//ao inves de da um awiat que faria esse query executar
	//no final dela eu do um toSql
	//ou seja isso devolve para mim a query e o paramtros
	const { sql, params } = db
			.select({
				id: schema.shortenedUrls.id,
				originalUrl: schema.shortenedUrls.originalUrl,
				shortenedUrl: schema.shortenedUrls.shortenedUrl,
				acessCount: schema.shortenedUrls.acessCount,
                createdAt: schema.shortenedUrls.createdAt
			})
			.from(schema.shortenedUrls)
		.toSQL()


	const cursor = pg.unsafe(sql, params as string[]).cursor(50)

	const csv = stringify({
		delimiter: ',',
		header: true,
		//como vai ler o cabeçalho
		//como eu trago do banco de dados e não daqui então a escrita tem qu está igual a da coluna
		columns: [
			{ key: 'id', header: 'ID' },
			{ key: 'original_url', header: 'Original URL' },
			{ key: 'shortened_url', header: 'Short URL' },
            { key: 'access_count', header: 'Acess Count' },
			{ key: 'created_at', header: 'Created at' },
		],
	})

	//o que é uma PassThrough
	const uploadToSorageStream = new PassThrough()

	const convertToCSVpipeline = pipeline(
		//aqui eu vou passar um curso ou seja os dados vai ser do cursor
		cursor,
        new Transform({
            //
            objectMode: true,
            transform(chunks: unknown[], encoding, callback){
                for (const chunk of chunks){
                    //aqui stou escrevendo cada linha do banco de dados uma por vez
                    this.push(chunk)
                }
                // console.log(chunk.toString())
                callback()
            }
        }),
		csv,
		//stream de escrita R2
        uploadToSorageStream
		
	)
     const fileName = `${new Date().toISOString()}-uploads.csv`

	//vou criar um metodo direto do node que é o pipeline
	const uploadToSorage = uploadFileToStorage({
	    contentType: 'text/csv',
	    folder: 'dowloads',
	    fileName: fileName,
	    //a gente não tem pois ainda não chegou ao fim
	    contentStream: uploadToSorageStream
	})

	// aqui eu vou dar um await nessas duas stream mais eu posso aguarda elas
	//mais elas podem executar ao mesmo tempo
	const results  = await Promise.all([
	    convertToCSVpipeline,
	    uploadToSorage
	])

    //fazer a inserção no banco
	await db.insert(schema.generetedCsv).values({
        name: fileName,
		remoteKey: results[1].key,
		remoteUrl: results[1].url,
	})

	//console.log(url)

	return makeRight({ reportUrl: results[1].url })
}
