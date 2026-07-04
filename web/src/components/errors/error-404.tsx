

export function Error404() {
    
    return (
        <div className="bg-white flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Link não encontrado</h1>
            <p className="text-gray-500">
                O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em
                <a
                    className="text-blue-500 underline cursor-pointer"
                    href={window.location.origin}
                >
                    brev.ly.
                </a>
            </p>
        </div>
    )
}
