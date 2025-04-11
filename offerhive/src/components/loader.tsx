export default function Loader({ size }: { size: number }) {
    const baseSizes = [12, 24, 28, 18];
    const scaledSizes = baseSizes.map((s) => s * size);
  
    return (
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div
          className="border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"
          style={{ width: scaledSizes[0], height: scaledSizes[0] }}
        >
          <div
            className="border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"
            style={{ width: scaledSizes[1], height: scaledSizes[1] }}
          >
            <div
              className="border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-orange-400 rounded-full"
              style={{ width: scaledSizes[2], height: scaledSizes[2] }}
            >
              <div
                className="border-4 border-transparent text-red-400 text-4xl animate-spin flex items-center justify-center border-t-yellow-500 rounded-full"
                style={{ width: scaledSizes[3], height: scaledSizes[3] }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  