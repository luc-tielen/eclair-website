import fs from "fs/promises";

interface RawBenchmarkResult {
  date: string;
  commitHash: string;
  results: [
    any,
    any,
    {
      reportName: string;
      reportAnalysis: {
        anRegress: [
          {
            regCoeffs: {
              iters: {
                estPoint: number;
                estError: { confIntLDX: number; confIntUDX: number };
              };
            };
          }
        ];
      };
    }[]
  ];
}

interface BenchmarkResult {
  date: string;
  commitHash: string;
  results: {
    reportName: string;
    unit: string;
    values: {
      estimated: number;
      lowerBound: number;
      upperBound: number;
    };
  }[];
}

const parseCriterionResults = (json: RawBenchmarkResult): BenchmarkResult => ({
  date: json.date,
  commitHash: json.commitHash,
  results: json.results[2].map((report) => {
    const results = report.reportAnalysis.anRegress[0].regCoeffs.iters;
    return {
      reportName: report.reportName,
      unit: "Time (s)",
      values: {
        estimated: results.estPoint,
        lowerBound: results.estPoint - results.estError.confIntLDX,
        upperBound: results.estPoint + results.estError.confIntUDX,
      },
    };
  }),
});

const main = async () => {
  console.log("Processing new benchmark...");

  const newBenchmarkFile = "./performance/new-data.json";
  const benchmarkData = JSON.parse(
    await fs.readFile(newBenchmarkFile, { encoding: "utf-8" })
  );

  const historicalFile = "./performance/historical-data.json";
  const historicalData = JSON.parse(
    await fs.readFile(historicalFile, { encoding: "utf-8" })
  ) as BenchmarkResult[];

  const processedBenchmarkData = parseCriterionResults(benchmarkData);
  historicalData.push(processedBenchmarkData);
  await fs.writeFile(historicalFile, JSON.stringify(historicalData, null, 2));

  console.log("Benchmark saved!");
};

await main();
