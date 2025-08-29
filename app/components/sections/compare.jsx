// app/components/sections/Compare.jsx

export function Compare() {
    return (
      <div className="container py-12 md:py-24">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          {/* Left Column: Text Content */}
          <div className="flex-shrink-0 text-center lg:w-1/3 lg:text-left">
            <img
              alt="Theodent Us vs. Them logo"
              src="/imgs/usvthem.png"
              className="inline-block w-4/5 max-w-[200px] lg:inline"
            />
            <p className="mt-4 text-base md:text-lg theo-h3">
              No compromises, just clean and effective oral care. Theodent
              toothpaste is the only option that rapidly remineralizes enamel,
              reduces sensitivity, and contains non-toxic, clean ingredients.
            </p>
          </div>
  
          {/* Right Column: Comparison Chart Image */}
          <div className="w-full mt-8 overflow-x-auto lg:mt-0 lg:w-2/3">
            <img
              alt="Comparison chart of Theodent vs. other toothpaste brands"
              src="/imgs/compareChart.webp"
              className="w-full min-w-[600px]"
            />
          </div>
        </div>
      </div>
    );
  }