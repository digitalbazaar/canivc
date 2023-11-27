module.exports = async () => {
    const {allImplementations} = await import('vc-test-suite-implementations');
    return Object.fromEntries(allImplementations.entries());
};
