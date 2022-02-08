# Refactoring Your Test Suite

The way you approach refactoring will vary based on the size and types of tests in your suite. One guiding light in refactoring is to optimize the suite for confidence and speed. Because we used TDD to implement our comment feature, we should feel confident that our comments are working as expected, and the feature is fully covered.

### Consider the questions below when deciding how to refactor your suite:

+ *How much longer does it take to run my test suite with these new tests?*
+ *Is the additional amount of time that your test suite takes to run acceptable?*
+ *Is there overlap between any of my new tests?*
+ *Is there overlap between my new tests and existing tests?*

Let’s take a moment to consider a few of these questions in the context of our test suite.

### *How much longer does it take to run my test suite with these new tests?*

+ You can calculate this value by running your test suite before and after writing the new tests, and calculate the difference. Seven new tests, like the ones above may only add a few seconds to your suite. Let’s use our next question to think about how you can evaluate what an acceptable amount of time may be.

### *Is the additional amount of time that your test suite takes to run acceptable?*

+ Although a few seconds may seem acceptable, this time can add up as your suite grows. Even if you’re comfortable with the additional time, you should always consider whether you can make speed improvements that don’t impact confidence.

### *Is there overlap between any of my new tests?*

+ You should consider if any new tests, especially in the feature or server level, can be deleted without impacting your confidence that the comments feature works as expected. For example, our first server test checks if the server generates an HTML field for comments. Your feature-level test checks the same functionality — it also takes longer, but provides a higher level of confidence. We decide to delete the server test for reasons we will investigate when we consider our next question.

### *Is there overlap between my new tests and existing tests?*

+ Next, you should look outside your seven (now six) new tests to consider the coverage offered by the other tests in your suite. Often, your test suite will have a feature test that checks whether the web page renders as expected — this is usually good enough coverage for most new features. Given the cost of feature-level tests, and the coverage of your lower-level tests, it often makes sense to delete the new feature-level test.
