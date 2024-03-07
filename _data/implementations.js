module.exports = async () => {
  const {
    allImplementations: vcwgImplementations
  } = await import("w3c-vc-test-suite-implementations");
  const {
    allImplementations: ccgImplementations
  } = await import("w3c-ccg-vc-test-suite-implementations");

  return {
    ...Object.fromEntries(vcwgImplementations.entries()),
    ...Object.fromEntries(ccgImplementations.entries())
  };
};
