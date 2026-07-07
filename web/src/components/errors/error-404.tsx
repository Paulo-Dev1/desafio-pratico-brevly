

export function Error404() {
    
    return (
		<div className="bg-white flex flex-col items-center justify-center text-center gap-4 w-[580px] h-[329px] rounded-lg p-10">
			<img src="/favicon.svg" alt="Logo" width={48} height={48} />
			<h1 className="text-xl font-bold text-gray-600">Link não encontrado</h1>
			<div className=" items-center justify-center flex flex-col gap-1">
				<p className="text-gray-500 text-sm">
					O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em 
					<a
						className="text-blue-base text-sm underline cursor-pointer ml-1"
						href={window.location.origin}
					>
						brev.ly
					</a>
				</p>
			</div>
		</div>
    )
}
