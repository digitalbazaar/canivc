module.exports = async () => {
  const {
    allImplementations: vcwgImplementations
  } = await import("vc-test-suite-implementations");
  const {
    allImplementations: ccgImplementations
  } = await import("vc-api-test-suite-implementations");

  return {
    ...Object.fromEntries(vcwgImplementations.entries()),
    ...Object.fromEntries(ccgImplementations.entries())
  };
};
