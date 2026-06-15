import { defineConfig } from 'tsup'

//os arquivos que quero fazer biulds
export default defineConfig({
	//todos os arquvios que estiverem nesta pasta e forem .ts
	entry: ['src/**/*.ts'],
	//limpa o diretoio de biuld depois roda de novo
	clean: true,

	//o node suporta o type escript model
	format: 'esm',

	//diretorio da biuld e no git ignore ele já esta ignorado
	outDir: 'dist',
})
