
    var testsContext = require.context("../../test/spec", false);

    var runnable = testsContext.keys();

    runnable.forEach(testsContext);
    