// Utility to measure execution time in milliseconds
function measureExecutionTime(fn, args) {
  const start = performance.now();
  fn(...args);
  return performance.now() - start;
}

class AlgoTester {
  private testSuites: {};

  constructor() {
    this.testSuites = {};
  }

  createTestSuite(name) {
    if (this.testSuites[name]) {
      console.error(`Test suite \"${name}\" already exists.`);
      return;
    }
    this.testSuites[name] = { algorithms: [], executions: 1, params: [] };
  }

  addAlgorithm(testSuiteName, algorithm, description) {
    const suite = this.testSuites[testSuiteName];
    if (!suite) {
      console.error(`Test suite \"${testSuiteName}\" not found.`);
      return;
    }
    suite.algorithms.push({ algorithm, description });
  }

  configureExecutions(testSuiteName, executions) {
    if (executions <= 0) {
      console.error("Execution count must be greater than 0.");
      return;
    }
    const suite = this.testSuites[testSuiteName];
    if (suite) {
      suite.executions = executions;
    } else {
      console.error(`Test suite \"${testSuiteName}\" not found.`);
    }
  }

  setParameters(testSuiteName, params) {
    const suite = this.testSuites[testSuiteName];
    if (suite) {
      suite.params = params;
    } else {
      console.error(`Test suite \"${testSuiteName}\" not found.`);
    }
  }

  runTestSuite(testSuiteName) {
    const suite = this.testSuites[testSuiteName];
    if (!suite) {
      console.error(`Test suite \"${testSuiteName}\" not found.`);
      return;
    }

    const results = [];

    for (const { algorithm, description } of suite.algorithms) {
      let totalTime = 0;
      for (let i = 0; i < suite.executions; i++) {
        totalTime += measureExecutionTime(algorithm, suite.params);
      }
      const averageTime = totalTime / suite.executions;
      results.push({ description, averageTime });
    }

    results.sort((a, b) => a.averageTime - b.averageTime);

    console.log(`\nResults for test suite: ${testSuiteName}`);
    results.forEach((result, index) => {
      console.log(
        `${index + 1}. Algorithm: ${result.description}, Average Time: ${result.averageTime.toFixed(2)} ms`
      );
    });

    if (results.length > 1) {
      console.log(`Fastest: ${results[0].description}`);
      console.log(`Slowest: ${results[results.length - 1].description}`);
    }
  }
}

// Example usage
const tester = new AlgoTester();

// Create a test suite
tester.createTestSuite("containsDuplicate");
tester.createTestSuite("findCommonElements");
tester.createTestSuite("fibonacci");

// Add algorithms to the test suite
tester.addAlgorithm("containsDuplicate", containsDuplicate, "Contains Duplicate Algorithm");
tester.addAlgorithm("findCommonElements", findCommonElements, "Find Common Elements Algorithm");
tester.addAlgorithm("fibonacci", fibonacci, "Fibonacci Algorithm");

// Configure the number of executions
tester.configureExecutions("containsDuplicate", 5);
tester.configureExecutions("findCommonElements", 5);
tester.configureExecutions("fibonacci", 5);

// Set the parameters for testing
tester.setParameters("containsDuplicate", [[1, 2, 3, 4, 5, 1]]);
tester.setParameters("findCommonElements", [[1, 2, 3, 4, 5, 1], [1, 2, 3, 4, 5, 1]]);
tester.setParameters("fibonacci", [15]);

// Run the test suite
tester.runTestSuite("containsDuplicate");
tester.runTestSuite("findCommonElements");
tester.runTestSuite("fibonacci");

// Algorithm implementations
function containsDuplicate(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return true;
      }
    }
  }
  return false;
}

function findCommonElements(array1, array2) {
  let commonElements = [];
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array2.length; j++) {
      if (array1[i] === array2[j]) {
        commonElements.push(array1[i]);
      }
    }
  }
  return commonElements;
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
