export function UrlShortened() {
  return (

    <div className="flex flex-col items-center justify-start gap-4 h-[340px] w-[380px] bg-white p-4 rounded-xl">
      <p className="text-lg font-semibold text-gray-800">Your shortened URL:</p>
      <input type="text" placeholder="Texto 1" className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800" />
      <input type="text" placeholder="Texto 2" className="w-full rounded border border-gray-300 px-3 py-2 text-gray-800" />
      <p className="text-md text-gray-600"> texto</p>
    </div> 
    )
}